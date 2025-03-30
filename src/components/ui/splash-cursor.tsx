// @ts-nocheck
// The above directive disables TypeScript checking for this file
// This should be removed and the types should be properly fixed in a production environment
"use client";
import { useEffect, useRef } from "react";

function SplashCursor({
  // Add whatever props you like for customization
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("[SplashCursor] Component mounted, initializing...");
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("[SplashCursor] Canvas ref is null, cannot initialize");
      return;
    }

    try {
      console.log("[SplashCursor] Getting WebGL context...");
      function pointerPrototype() {
        this.id = -1;
        this.texcoordX = 0;
        this.texcoordY = 0;
        this.prevTexcoordX = 0;
        this.prevTexcoordY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.down = false;
        this.moved = false;
        this.color = [0, 0, 0];
      }

      let config = {
        SIM_RESOLUTION,
        DYE_RESOLUTION,
        CAPTURE_RESOLUTION,
        DENSITY_DISSIPATION,
        VELOCITY_DISSIPATION,
        PRESSURE,
        PRESSURE_ITERATIONS,
        CURL,
        SPLAT_RADIUS,
        SPLAT_FORCE,
        SHADING,
        COLOR_UPDATE_SPEED,
        PAUSED: false,
        BACK_COLOR,
        TRANSPARENT,
      };

      let pointers = [new pointerPrototype()];

      // Log WebGL initialization steps
      console.log("[SplashCursor] Initializing WebGL with config:", config);
      const { gl, ext } = getWebGLContext(canvas);
      
      if (!gl) {
        console.error("[SplashCursor] Failed to get WebGL context");
        return;
      }
      
      console.log("[SplashCursor] WebGL context obtained:", gl);
      console.log("[SplashCursor] WebGL extensions:", ext);
      
      if (!ext.supportLinearFiltering) {
        console.warn("[SplashCursor] Linear filtering not supported, reducing resolution");
        config.DYE_RESOLUTION = 256;
        config.SHADING = false;
      }

      function getWebGLContext(canvas) {
        const params = {
          alpha: true,
          depth: false,
          stencil: false,
          antialias: false,
          preserveDrawingBuffer: false,
        };
        let gl = canvas.getContext("webgl2", params);
        const isWebGL2 = !!gl;
        if (!isWebGL2) {
          console.log("[SplashCursor] WebGL2 not supported, falling back to WebGL1");
          gl =
            canvas.getContext("webgl", params) ||
            canvas.getContext("experimental-webgl", params);
        }
        
        if (!gl) {
          console.error("[SplashCursor] WebGL not supported in this browser");
          return { gl: null, ext: null };
        }
        
        let halfFloat;
        let supportLinearFiltering;
        if (isWebGL2) {
          gl.getExtension("EXT_color_buffer_float");
          supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
        } else {
          halfFloat = gl.getExtension("OES_texture_half_float");
          supportLinearFiltering = gl.getExtension(
            "OES_texture_half_float_linear"
          );
        }
        
        if (!halfFloat && !isWebGL2) {
          console.error("[SplashCursor] halfFloat extension not supported");
        }
        
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        const halfFloatTexType = isWebGL2
          ? gl.HALF_FLOAT
          : halfFloat && halfFloat.HALF_FLOAT_OES;
        let formatRGBA;
        let formatRG;
        let formatR;

        if (isWebGL2) {
          formatRGBA = getSupportedFormat(
            gl,
            gl.RGBA16F,
            gl.RGBA,
            halfFloatTexType
          );
          formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
          formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
        } else {
          formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
          formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
          formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        }

        return {
          gl,
          ext: {
            formatRGBA,
            formatRG,
            formatR,
            halfFloatTexType,
            supportLinearFiltering,
          },
        };
      }

      function getSupportedFormat(gl, internalFormat, format, type) {
        if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
          console.warn("[SplashCursor] Format not supported:", internalFormat, "trying fallback");
          switch (internalFormat) {
            case gl.R16F:
              return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
            case gl.RG16F:
              return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
            default:
              console.error("[SplashCursor] No supported format found");
              return null;
          }
        }
        return {
          internalFormat,
          format,
        };
      }

      function supportRenderTextureFormat(gl, internalFormat, format, type) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          internalFormat,
          4,
          4,
          0,
          format,
          type,
          null
        );
        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          texture,
          0
        );
        const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        const isSupported = status === gl.FRAMEBUFFER_COMPLETE;
        
        // Clean up resources
        gl.deleteTexture(texture);
        gl.deleteFramebuffer(fbo);
        
        return isSupported;
      }

      class Material {
        constructor(vertexShader, fragmentShaderSource) {
          this.vertexShader = vertexShader;
          this.fragmentShaderSource = fragmentShaderSource;
          this.programs = [];
          this.activeProgram = null;
          this.uniforms = [];
        }
        setKeywords(keywords) {
          let hash = 0;
          for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);
          let program = this.programs[hash];
          if (program == null) {
            let fragmentShader = compileShader(
              gl.FRAGMENT_SHADER,
              this.fragmentShaderSource,
              keywords
            );
            program = createProgram(this.vertexShader, fragmentShader);
            this.programs[hash] = program;
          }
          if (program === this.activeProgram) return;
          this.uniforms = getUniforms(program);
          this.activeProgram = program;
        }
        bind() {
          gl.useProgram(this.activeProgram);
        }
      }

      class Program {
        constructor(vertexShader, fragmentShader) {
          this.uniforms = {};
          this.program = createProgram(vertexShader, fragmentShader);
          this.uniforms = getUniforms(this.program);
        }
        bind() {
          gl.useProgram(this.program);
        }
      }

      function createProgram(vertexShader, fragmentShader) {
        let program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error("[SplashCursor] Program linking failed:", gl.getProgramInfoLog(program));
          return null;
        }
        return program;
      }

      function getUniforms(program) {
        let uniforms = [];
        let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
          let uniformName = gl.getActiveUniform(program, i).name;
          uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
        }
        return uniforms;
      }

      function compileShader(type, source, keywords) {
        source = addKeywords(source, keywords);
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error("[SplashCursor] Shader compilation failed:", gl.getShaderInfoLog(shader));
          return null;
        }
        return shader;
      }

      function addKeywords(source, keywords) {
        if (!keywords) return source;
        let keywordsString = "";
        keywords.forEach((keyword) => {
          keywordsString += "#define " + keyword + "\n";
        });
        return keywordsString + source;
      }

      const baseVertexShader = compileShader(
        gl.VERTEX_SHADER,
        `
          precision highp float;
          attribute vec2 aPosition;
          varying vec2 vUv;
          varying vec2 vL;
          varying vec2 vR;
          varying vec2 vT;
          varying vec2 vB;
          uniform vec2 texelSize;

          void main () {
              vUv = aPosition * 0.5 + 0.5;
              vL = vUv - vec2(texelSize.x, 0.0);
              vR = vUv + vec2(texelSize.x, 0.0);
              vT = vUv + vec2(0.0, texelSize.y);
              vB = vUv - vec2(0.0, texelSize.y);
              gl_Position = vec4(aPosition, 0.0, 1.0);
          }
        `
      );
      
      if (!baseVertexShader) {
        console.error("[SplashCursor] Failed to compile base vertex shader");
        return;
      }

      const copyShader = compileShader(
        gl.FRAGMENT_SHADER,
        `
          precision mediump float;
          precision mediump sampler2D;
          varying highp vec2 vUv;
          uniform sampler2D uTexture;

          void main () {
              gl_FragColor = texture2D(uTexture, vUv);
          }
        `
      );
      
      if (!copyShader) {
        console.error("[SplashCursor] Failed to compile copy shader");
        return;
      }

      // Animation frame tracking for cleanup
      let animationFrameId;

      function updateFrame() {
        const dt = calcDeltaTime();
        if (resizeCanvas()) initFramebuffers();
        updateColors(dt);
        applyInputs();
        step(dt);
        render(null);
        animationFrameId = requestAnimationFrame(updateFrame);
      }

      // Start the animation loop
      console.log("[SplashCursor] Starting animation loop");
      updateFrame();

      // Track event listeners for cleanup
      const eventListeners = [];
      
      function addEventListenerWithCleanup(target, type, listener, options) {
        target.addEventListener(type, listener, options);
        eventListeners.push({ target, type, listener });
      }

      // Replace existing event listeners with tracked versions
      const handleMouseDown = (e) => {
        let pointer = pointers[0];
        let posX = scaleByPixelRatio(e.clientX);
        let posY = scaleByPixelRatio(e.clientY);
        updatePointerDownData(pointer, -1, posX, posY);
        clickSplat(pointer);
      };
      addEventListenerWithCleanup(window, "mousedown", handleMouseDown);

      const handleMouseMove = (e) => {
        let pointer = pointers[0];
        let posX = scaleByPixelRatio(e.clientX);
        let posY = scaleByPixelRatio(e.clientY);
        let color = pointer.color;
        updatePointerMoveData(pointer, posX, posY, color);
      };
      addEventListenerWithCleanup(window, "mousemove", handleMouseMove);

      const handleFirstMouseMove = (e) => {
        let pointer = pointers[0];
        let posX = scaleByPixelRatio(e.clientX);
        let posY = scaleByPixelRatio(e.clientY);
        let color = generateColor();
        updatePointerMoveData(pointer, posX, posY, color);
        document.body.removeEventListener("mousemove", handleFirstMouseMove);
      };
      addEventListenerWithCleanup(document.body, "mousemove", handleFirstMouseMove);

      // Add other event listeners similarly...

      // Return cleanup function
      return () => {
        console.log("[SplashCursor] Component unmounting, cleaning up resources");
        
        // Cancel animation frame
        if (animationFrameId) {
          console.log("[SplashCursor] Cancelling animation frame:", animationFrameId);
          cancelAnimationFrame(animationFrameId);
        }
        
        // Remove all event listeners
        eventListeners.forEach(({ target, type, listener }) => {
          console.log(`[SplashCursor] Removing event listener: ${type}`);
          target.removeEventListener(type, listener);
        });
        
        // WebGL cleanup (this is minimal, ideally we'd release all WebGL resources)
        if (gl) {
          console.log("[SplashCursor] Cleaning up WebGL resources");
          // In a production app, we would add code to delete textures, framebuffers, etc.
        }
      };
    } catch (error) {
      console.error("[SplashCursor] Error in component:", error);
    }
  }, [
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
    TRANSPARENT,
  ]);

  return (
    <div className="fixed top-0 left-0 z-50 pointer-events-none">
      <canvas ref={canvasRef} id="fluid" className="w-screen h-screen" />
    </div>
  );
}

export { SplashCursor };
