pathgl.shader = shader

function RenderTexture(prog, options) {
  extend(this, {
    fbo: gl.createFramebuffer()
  , program: prog || program
  , gl: gl
  , mesh: Mesh(gl, { pos: { array: Quad(), size: 2 }
                   , attrList: ['pos']
                   , count: 4
                   , primitive: 'triangle_strip'
                   })
  }, options)

  this.__renderTarget__ = RenderTarget(this)
  this.update = function () {
                  console.log('hi')
                  this.__renderTarget__.update()
                }.bind(this)

  this.repeat = Texture.repeat
}


function shader() {
  var dependents = []
    , target = null
    , blockSize
    , render

  var self = {
      read: read
    , map: map
    , match: matchWith
    , pipe: pipe
    , invalidate: function () {
        this.render.update()
        dependents.forEach(function (d) {
          d.invalidate()
        })
      }
  }

  return self

  function read(tex) {
    this.render.__renderTarget__.drawTo(tex)
  }

  function map (shader, start) {
    self.render =
      new RenderTexture(createProgram(gl, simulation_vs, shader, ['pos']), {})
    return this
  }

  function matchWith() {
    return this
  }

  function pipe (ctx) {
    dependents.push(ctx)
  }
}
