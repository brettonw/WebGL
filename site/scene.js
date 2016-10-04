"use strict;"

let scene;
let currentPosition = [0, 0];

let standardUniforms = Object.create(null);

let draw = function (deltaPosition) {
    // update the current position and clamp or wrap accordingly
    currentPosition = Float2.add (currentPosition, deltaPosition);
    while (currentPosition[0] > 1) {
        currentPosition[0] -= 2;
    }
    while (currentPosition[0] < -1) {
        currentPosition[0] += 2;
    }
    currentPosition[1] = Math.min (currentPosition[1], 0.9);
    currentPosition[1] = Math.max (currentPosition[1], -0.9);

    // compute the view parameters as up or down, and left or right
    let upAngle = currentPosition[1] * Math.PI * 0.5;
    let viewOffset = Float2.scale ([Math.cos (upAngle), Math.sin (upAngle)], -3);

    // setup the view matrix
    let viewMatrix = Float4x4.identity ();
    Float4x4.rotateX (viewMatrix, upAngle);
    viewMatrix  = Float4x4.multiply (Float4x4.translate ([0, viewOffset[1], viewOffset[0]]), viewMatrix);
    Float4x4.rotateY (viewMatrix,currentPosition[0] * Math.PI);
    //viewMatrix = Float4x4.multiply (Float4x4.scale ([ 2, 2, 2 ]), viewMatrix);
    //viewMatrix  = Float4x4.multiply (Float4x4.translate ([ -0.5, -0.5, -0.5 ]), viewMatrix);
    standardUniforms.VIEW_MATRIX_PARAMETER = viewMatrix;
    standardUniforms.MODEL_MATRIX_PARAMETER = Float4x4.identity ();

    // compute the camera position and set it in the standard uniforms
    let vmi = Float4x4.inverse (viewMatrix);
    standardUniforms.CAMERA_POSITION = [vmi[12], vmi[13], vmi[14]];

    // draw the scene
    scene.traverse (standardUniforms);
};

let buildScene = function () {
    makeRevolve ("cylinder",
        [[ 1.0,  1.0], [ 1.0, -1.0], [ 1.0, -1.0], [ 0.8, -1.0], [ 0.8, -1.0], [ 0.8,  1.0], [ 0.8,  1.0], [ 1.0,  1.0]],
        [[ 1.0,  0.0], [ 1.0,  0.0], [ 0.0, -1.0], [ 0.0, -1.0], [-1.0,  0.0], [-1.0,  0.0], [ 0.0,  1.0], [ 0.0,  1.0]],
        36);
    makeBall ("ball", 36);

    scene = Node.new ({
        name: "root",
        state: function (standardUniforms) {
            // ordinarily, webGl will automatically present and clear when we return control to the
            // event loop from the draw function, but we overrode that to have explicit control.
            // webGl still presents the buffer automatically, but the back buffer is not cleared
            // until we do it...
            context.clearColor (0.0, 0.0, 0.0, 1.0);
            context.clear (context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);

            // extensions I want for getting gradient infomation inside the fragment shaders
            //context.getExtension ("OES_standard_derivatives");
            //context.getExtension ("EXT_shader_texture_lod");

            // oh for &#^%'s sake, alpha blending should be standard
            context.blendFunc (context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA);
            context.enable (context.BLEND);

            // a little bit of setup for light direction
            standardUniforms.LIGHT_DIRECTION = Float3.normalize ([0, 10, -100]);
        }
    });

    let starfield = Node.new ({
        name: "starfield",
        transform: Float4x4.multiply(Float4x4.rotateX (Float4x4.identity (), Math.PI), Float4x4.scale (-190)),
        state: function (standardUniforms) {
            Program.get ("texture").use ();
            context.disable (context.DEPTH_TEST);
            context.enable (context.CULL_FACE);
            context.cullFace (context.BACK);
            standardUniforms.OUTPUT_ALPHA_PARAMETER = 1.0;
            standardUniforms.TEXTURE_SAMPLER = "starfield";
        },
        shape: "ball"
    });
    scene.addChild (starfield);

    let constellations = Node.new ({
        name: "constellations",
        state: function (standardUniforms) {
            Program.get ("overlay").use ();
            context.disable (context.DEPTH_TEST);
            context.enable (context.CULL_FACE);
            context.cullFace (context.BACK);
            standardUniforms.OUTPUT_ALPHA_PARAMETER = 0.5;
            standardUniforms.TEXTURE_SAMPLER = "constellations";
        },
        shape: "ball",
        children: false
    });
    starfield.addChild (constellations);

    if (false) {
        let test = Node.new ({
            name: "test",
            state: function (standardUniforms) {
                Program.get ("texture").use ();
                context.enable (context.DEPTH_TEST);
                context.enable (context.CULL_FACE);
                context.cullFace (context.BACK);
                standardUniforms.OUTPUT_ALPHA_PARAMETER = 1.0;
                standardUniforms.TEXTURE_SAMPLER = "earth-plate-carree";
            },
            shape: "ball"
        });
        scene.addChild (test);
    } else {
        let earth = Node.new ({
            name: "earth",
            state: function (standardUniforms) {
                Program.get ("earth").use ()
                    .setDayTxSampler ("earth-day")
                    .setNightTxSampler ("earth-night")
                    .setSpecularMapTxSampler ("earth-specular-map");
                context.enable (context.DEPTH_TEST);
                context.enable (context.CULL_FACE);
                context.cullFace (context.BACK);
                standardUniforms.OUTPUT_ALPHA_PARAMETER = 1.0;
            },
            shape: "ball"
        });
        scene.addChild (earth);

        let clouds = Node.new ({
            name: "clouds",
            transform: Float4x4.scale ((40 + 6378.1370) / 6378.1370),
            state: function (standardUniforms) {
                Program.get ("overlay-lighting").use ();
                context.enable (context.DEPTH_TEST);
                context.enable (context.CULL_FACE);
                context.cullFace (context.BACK);
                standardUniforms.OUTPUT_ALPHA_PARAMETER = 0.90;
                standardUniforms.TEXTURE_SAMPLER = "clouds";
            },
            shape: "ball"
        });
        scene.addChild (clouds);

        let atmosphereDepth = (160 + 6378.1370) / 6378.1370;
        let atmosphere = Node.new ({
            name: "clouds",
            transform: Float4x4.scale (atmosphereDepth),
            state: function (standardUniforms) {
                Program.get ("atmosphere").use ()
                    .setAtmosphereDepth (atmosphereDepth - 1.0);
                context.enable (context.DEPTH_TEST);
                context.enable (context.CULL_FACE);
                context.cullFace (context.BACK);
                standardUniforms.OUTPUT_ALPHA_PARAMETER = 0.4;
            },
            shape: "ball"
        });
        scene.addChild (atmosphere);
    }

    let projectionMatrix = Float4x4.create ();
    Float4x4.perspective (60, context.viewportWidth / context.viewportHeight, 0.1, 200.0, projectionMatrix);
    standardUniforms.PROJECTION_MATRIX_PARAMETER = projectionMatrix;
    standardUniforms.OUTPUT_ALPHA_PARAMETER = 1.0;


    draw ([0, 0]);
};
