let Texture = function () {
    let _ = Object.create (null);

    let textures = Object.create (null);
    let afExtension;

    _.construct  = function (name, parameters, onReady) {
        this.name = name;
        LOG("Texture: " + name);

        let texture = this.texture = context.createTexture();
        let image = new Image();
        let scope = this;
        image.onload = function() {
            context.bindTexture (context.TEXTURE_2D, texture);
            context.texImage2D (context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, image);
            context.texParameteri (context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);
            if (("generateMipMap" in parameters) && (parameters.generateMipMap == true)) {
                context.texParameteri (context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR_MIPMAP_LINEAR);
                context.texParameterf (context.TEXTURE_2D, afExtension.TEXTURE_MAX_ANISOTROPY_EXT, parameters.anisotropicFiltering);
                context.generateMipmap (context.TEXTURE_2D);
            } else {
                context.texParameteri (context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR);
            }
            context.bindTexture (context.TEXTURE_2D, null);

            // call the onReady handler
            onReady.notify (scope);
        };
        image.src = parameters.url;

        return this;
    };

    /**
     * static method to create and construct a new Texture.
     *
     * @method new
     * @static
     * @param {string} name the name to use to refer to this texture
     * @param {Object} parameters texture construction parameters
     * @param {Object} onReady an object specifying the scope and callback to call when ready
     * @return {Texture}
     */
    _.new = function (name, parameters, onReady) {
        afExtension = DEFAULT_FUNCTION (afExtension, function () { return context.getExtension ("EXT_texture_filter_anisotropic") });
        // make sure anisotropic filtering is defined, and has a reasonable default value
        parameters.anisotropicFiltering = Math.min (context.getParameter(afExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT), ("anisotropicFiltering" in parameters)? parameters.anisotropicFiltering : 4);
        return (textures[name] = Object.create (_).construct (name, parameters, onReady));
    };

    /**
     * fetch a texture by name.
     *
     * @method get
     * @static
     * @param {string} name the name of the texture to return
     * @return {Texture}
     */
    _.get = function (name) {
        return textures[name];
    };

    return _;
} ();
