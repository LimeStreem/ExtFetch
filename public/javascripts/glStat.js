var canvas = document.createElement("canvas");
var gl = canvas.getContext("webgl");
var extensions = [
  "ANGLE_instanced_arrays",
  "EXT_blend_minmax",
  "EXT_color_buffer_half_float",
  "EXT_disjoint_timer_query",
  "EXT_frag_depth",
  "EXT_sRGB",
  "EXT_shader_texture_lod",
  "EXT_texture_filter_anisotropic",
  "OES_element_index_uint",
  "OES_standard_derivatives",
  "OES_texture_float",
  "OES_texture_float_linear",
  "OES_texture_half_float",
  "OES_texture_half_float_linear",
  "OES_vertex_array_object",
  "WEBGL_color_buffer_float",
  "WEBGL_compressed_texture_atc",
  "WEBGL_compressed_texture_etc1",
  "WEBGL_compressed_texture_pvrtc",
  "WEBGL_compressed_texture_s3tc",
  "WEBGL_debug_renderer_info",
  "WEBGL_debug_shaders",
  "WEBGL_depth_texture",
  "WEBGL_draw_buffers",
  "WEBGL_lose_context"
];
var result = {};
extensions.forEach(function(name) {
  result[name] = gl.getExtension(name) !== null;
});

var isSupported;
if (gl.getExtension("WEBGL_color_buffer_float") === null) {
  var fbo = gl.createFramebuffer();
  var tex = gl.createTexture();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.FLOAT, null);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
    isSupported = false;
  } else {
    isSupported = true;
  }
  gl.deleteTexture(tex);
  gl.deleteFramebuffer(fbo);
} else {
  isSupported = true;
}

if(isSupported){
  result["WEBGL_color_buffer_float"] = isSupported;
}
