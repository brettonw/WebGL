"use strict;";let context;let render;let Render=function(){let _=Object.create(null);_.construct=function(canvasId){let canvas=this.canvas=document.getElementById(canvasId);let context=this.context=canvas.getContext("webgl",{preserveDrawingBuffer:true});context.viewportWidth=canvas.width;context.viewportHeight=canvas.height;context.viewport(0,0,context.viewportWidth,context.viewportHeight);return this};_.use=function(){context=this.context;return this};_.new=function(canvasId){return render=Object.create(_).construct(canvasId)};return _}();let glMatrixArrayType=typeof Float32Array!="undefined"?Float32Array:typeof WebGLFloatArray!="undefined"?WebGLFloatArray:Array;let FloatN=function(dim){let _=Object.create(null);_.create=function(){return new glMatrixArrayType(dim)};eval(function(){let str="_.copy = function (from, to) { ";str+="to = (typeof to !== 'undefined') ? to : _.create (); ";for(let i=0;i<dim;++i){str+="to["+i+"] = from["+i+"]; "}str+="return to; ";str+="}; ";return str}());eval(function(){let str="_.point = function (from, to) {";str+="to = (typeof to !== 'undefined') ? to : _.create (); ";let end=dim-1;for(let i=0;i<end;++i){str+="to["+i+"] = from["+i+"]; "}str+="to["+end+"] = 1; ";str+="return to; ";str+="}; ";return str}());eval(function(){let str="_.vector = function (from, to) {";str+="to = (typeof to !== 'undefined') ? to : _.create (); ";let end=dim-1;for(let i=0;i<end;++i){str+="to["+i+"] = from["+i+"]; "}str+="to["+end+"] = 0; ";str+="return to; ";str+="}; ";return str}());eval(function(){let str="_.dot = function (left, right) {";str+="return (left[0] * right[0])";for(let i=1;i<dim;++i){str+=" + (left["+i+"] * right["+i+"])"}str+="; ";str+="}; ";return str}());_.normSq=function(from){return _.dot(from,from)};_.norm=function(from){return Math.sqrt(_.normSq(from))};eval(function(){let str="_.add = function (left, right, to) {";str+="to = (typeof to !== 'undefined') ? to : _.create (); ";for(let i=0;i<dim;++i){str+="to["+i+"] = left["+i+"] + right["+i+"]; "}str+="return to; ";str+="}; ";return str}());eval(function(){let str="_.subtract = function (left, right, to) {";str+="to = (typeof to !== 'undefined') ? to : _.create (); ";for(let i=0;i<dim;++i){str+="to["+i+"] = left["+i+"] - right["+i+"]; "}str+="return to; ";str+="}; ";return str}());eval(function(){let str="_.scale = function (from, scale, to) {";str+="to = (typeof to !== 'undefined') ? to : _.create (); ";for(let i=0;i<dim;++i){str+="to["+i+"] = from["+i+"] * scale; "}str+="return to; ";str+="}; ";return str}());_.normalize=function(from,to){return _.scale(from,1/_.norm(from),to)};eval(function(){let strRow=function(from){let str="'(' + from["+index(row,0)+"]";for(let column=1;column<dim;++column){str+=" + ', ' + from["+index(row,column)+"]"}str+=" + ')'";return str};let str="_.str = function (from) {";str+="return '(' + from[0]";for(let i=1;i<dim;++i){str+=" + ', ' +  + from["+i+"]"}str+=" + ')'; ";str+="}; ";return str}());return _};let Float3=function(){let _=FloatN(3);_.cross=function(left,right,to){to=typeof to!=="undefined"?to:_.create();to[0]=left[1]*right[2]-left[2]*right[1];to[1]=left[2]*right[0]-left[0]*right[2];to[2]=left[0]*right[1]-left[1]*right[0];return to};return _}();let Float4=function(){let _=FloatN(4);return _}();let FloatNxN=function(dim){let _=Object.create(null);let _FloatN=FloatN(dim);let size=dim*dim;let index=function(row,column){return row*dim+column};_.create=function(){return new glMatrixArrayType(size)};eval(function(){let str="_.copy = function (from, to) { ";str+="to = (typeof to !== 'undefined') ? to : _.create (); ";for(let i=0;i<size;++i){str+="to["+i+"] = from["+i+"]; "}str+="return to; ";str+="}; ";return str}());eval(function(){let str="_.identity = function (to) {";str+="to = (typeof to !== 'undefined') ? to : _.create (); ";for(let row=0;row<dim;++row){for(let column=0;column<dim;++column){str+="to["+index(row,column)+"] = "+(row==column?1:0)+"; "}}str+="return to; ";str+="}; ";return str}());eval(function(){let str="_.transpose = function (from, to) {";str+="to = (typeof to !== 'undefined') ? to : _.create (); ";for(let row=0;row<dim;++row){for(let column=0;column<dim;++column){str+="to["+index(row,column)+"] = from["+index(column,row)+"]; "}}str+="return to; ";str+="}; ";return str}());eval(function(){let rc=function(r,c){let str="(left["+index(r,0)+"] * right["+index(0,c)+"])";for(let i=1;i<dim;++i){str+=" + (left["+index(r,i)+"] * right["+index(i,c)+"])"}str+="; ";return str};let str="_.multiply = function (left, right, to) {";str+="to = (typeof to !== 'undefined') ? to : _.create (); ";for(let row=0;row<dim;++row){for(let column=0;column<dim;++column){str+="to["+index(row,column)+"] = "+rc(row,column)}}str+="return to; ";str+="}; ";return str}());eval(function(){let end=dim-1;let str="_.scale = function (scale, to) {";str+="scale = Array.isArray(scale) ? scale : Array("+end+").fill(scale); ";str+="to = (typeof to !== 'undefined') ? to : _.create (); ";str+="_.identity (to); ";for(let i=0;i<end;++i){str+="to["+index(i,i)+"] = scale["+i+"]; "}str+="return to; ";str+="}; ";return str}());eval(function(){let strRow=function(row){let str="'(' + from["+index(row,0)+"]";for(let column=1;column<dim;++column){str+=" + ', ' + from["+index(row,column)+"]"}str+=" + ')'";return str};let str="_.str = function (from) {";str+="return ";str+=strRow(0);for(let row=1;row<dim;++row){str+=" + ', ' + "+strRow(row)}str+="; ";str+="}; ";return str}());return _};let Float4x4=function(){let _=FloatNxN(4);_.determinant=function(a){let b=a[0],c=a[1],d=a[2],e=a[3],g=a[4],f=a[5],h=a[6],i=a[7],j=a[8],k=a[9],l=a[10],o=a[11],m=a[12],n=a[13],p=a[14];a=a[15];return m*k*h*e-j*n*h*e-m*f*l*e+g*n*l*e+j*f*p*e-g*k*p*e-m*k*d*i+j*n*d*i+m*c*l*i-b*n*l*i-j*c*p*i+b*k*p*i+m*f*d*o-g*n*d*o-m*c*h*o+b*n*h*o+g*c*p*o-b*f*p*o-j*f*d*a+g*k*d*a+j*c*h*a-b*k*h*a-g*c*l*a+b*f*l*a};_.inverse=function(a,b){b||(b=a);let c=a[0],d=a[1],e=a[2],g=a[3],f=a[4],h=a[5],i=a[6],j=a[7],k=a[8],l=a[9],o=a[10],m=a[11],n=a[12],p=a[13],r=a[14],s=a[15],A=c*h-d*f,B=c*i-e*f,t=c*j-g*f,u=d*i-e*h,v=d*j-g*h,w=e*j-g*i,x=k*p-l*n,y=k*r-o*n,z=k*s-m*n,C=l*r-o*p,D=l*s-m*p,E=o*s-m*r,q=1/(A*E-B*D+t*C+u*z-v*y+w*x);b[0]=(h*E-i*D+j*C)*q;b[1]=(-d*E+e*D-g*C)*q;b[2]=(p*w-r*v+s*u)*q;b[3]=(-l*w+o*v-m*u)*q;b[4]=(-f*E+i*z-j*y)*q;b[5]=(c*E-e*z+g*y)*q;b[6]=(-n*w+r*t-s*B)*q;b[7]=(k*w-o*t+m*B)*q;b[8]=(f*D-h*z+j*x)*q;b[9]=(-c*D+d*z-g*x)*q;b[10]=(n*v-p*t+s*A)*q;b[11]=(-k*v+l*t-m*A)*q;b[12]=(-f*C+h*y-i*x)*q;b[13]=(c*C-d*y+e*x)*q;b[14]=(-n*u+p*B-r*A)*q;b[15]=(k*u-l*B+o*A)*q;return b};_.toRotationMat=function(a,b){b||(b=_.create());b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];b[9]=a[9];b[10]=a[10];b[11]=a[11];b[12]=0;b[13]=0;b[14]=0;b[15]=1;return b};_.toMat3=function(a,b){b||(b=mat3.create());b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[4];b[4]=a[5];b[5]=a[6];b[6]=a[8];b[7]=a[9];b[8]=a[10];return b};_.toInverseMat3=function(a,b){let c=a[0],d=a[1],e=a[2],g=a[4],f=a[5],h=a[6],i=a[8],j=a[9],k=a[10],l=k*f-h*j,o=-k*g+h*i,m=j*g-f*i,n=c*l+d*o+e*m;if(!n)return null;n=1/n;b||(b=mat3.create());b[0]=l*n;b[1]=(-k*d+e*j)*n;b[2]=(h*d-e*f)*n;b[3]=o*n;b[4]=(k*c-e*i)*n;b[5]=(-h*c+e*g)*n;b[6]=m*n;b[7]=(-j*c+d*i)*n;b[8]=(f*c-d*g)*n;return b};_.multiplyVec3=function(a,b,c){c||(c=b);let d=b[0],e=b[1];b=b[2];c[0]=a[0]*d+a[4]*e+a[8]*b+a[12];c[1]=a[1]*d+a[5]*e+a[9]*b+a[13];c[2]=a[2]*d+a[6]*e+a[10]*b+a[14];return c};_.multiplyVec4=function(a,b,c){c||(c=b);let d=b[0],e=b[1],g=b[2];b=b[3];c[0]=a[0]*d+a[4]*e+a[8]*g+a[12]*b;c[1]=a[1]*d+a[5]*e+a[9]*g+a[13]*b;c[2]=a[2]*d+a[6]*e+a[10]*g+a[14]*b;c[3]=a[3]*d+a[7]*e+a[11]*g+a[15]*b;return c};_.translate=function(a,b,c){let d=b[0],e=b[1];b=b[2];if(!c||a==c){a[12]=a[0]*d+a[4]*e+a[8]*b+a[12];a[13]=a[1]*d+a[5]*e+a[9]*b+a[13];a[14]=a[2]*d+a[6]*e+a[10]*b+a[14];a[15]=a[3]*d+a[7]*e+a[11]*b+a[15];return a}let g=a[0],f=a[1],h=a[2],i=a[3],j=a[4],k=a[5],l=a[6],o=a[7],m=a[8],n=a[9],p=a[10],r=a[11];c[0]=g;c[1]=f;c[2]=h;c[3]=i;c[4]=j;c[5]=k;c[6]=l;c[7]=o;c[8]=m;c[9]=n;c[10]=p;c[11]=r;c[12]=g*d+j*e+m*b+a[12];c[13]=f*d+k*e+n*b+a[13];c[14]=h*d+l*e+p*b+a[14];c[15]=i*d+o*e+r*b+a[15];return c};_.rotate=function(a,b,c,d){let e=c[0],g=c[1];c=c[2];let f=Math.sqrt(e*e+g*g+c*c);if(!f)return null;if(f!=1){f=1/f;e*=f;g*=f;c*=f}let h=Math.sin(b),i=Math.cos(b),j=1-i;b=a[0];f=a[1];let k=a[2],l=a[3],o=a[4],m=a[5],n=a[6],p=a[7],r=a[8],s=a[9],A=a[10],B=a[11],t=e*e*j+i,u=g*e*j+c*h,v=c*e*j-g*h,w=e*g*j-c*h,x=g*g*j+i,y=c*g*j+e*h,z=e*c*j+g*h;e=g*c*j-e*h;g=c*c*j+i;if(d){if(a!=d){d[12]=a[12];d[13]=a[13];d[14]=a[14];d[15]=a[15]}}else d=a;d[0]=b*t+o*u+r*v;d[1]=f*t+m*u+s*v;d[2]=k*t+n*u+A*v;d[3]=l*t+p*u+B*v;d[4]=b*w+o*x+r*y;d[5]=f*w+m*x+s*y;d[6]=k*w+n*x+A*y;d[7]=l*w+p*x+B*y;d[8]=b*z+o*e+r*g;d[9]=f*z+m*e+s*g;d[10]=k*z+n*e+A*g;d[11]=l*z+p*e+B*g;return d};_.rotateX=function(a,b,c){let d=Math.sin(b);b=Math.cos(b);let e=a[4],g=a[5],f=a[6],h=a[7],i=a[8],j=a[9],k=a[10],l=a[11];if(c){if(a!=c){c[0]=a[0];c[1]=a[1];c[2]=a[2];c[3]=a[3];c[12]=a[12];c[13]=a[13];c[14]=a[14];c[15]=a[15]}}else c=a;c[4]=e*b+i*d;c[5]=g*b+j*d;c[6]=f*b+k*d;c[7]=h*b+l*d;c[8]=e*-d+i*b;c[9]=g*-d+j*b;c[10]=f*-d+k*b;c[11]=h*-d+l*b;return c};_.rotateY=function(a,b,c){let d=Math.sin(b);b=Math.cos(b);let e=a[0],g=a[1],f=a[2],h=a[3],i=a[8],j=a[9],k=a[10],l=a[11];if(c){if(a!=c){c[4]=a[4];c[5]=a[5];c[6]=a[6];c[7]=a[7];c[12]=a[12];c[13]=a[13];c[14]=a[14];c[15]=a[15]}}else c=a;c[0]=e*b+i*-d;c[1]=g*b+j*-d;c[2]=f*b+k*-d;c[3]=h*b+l*-d;c[8]=e*d+i*b;c[9]=g*d+j*b;c[10]=f*d+k*b;c[11]=h*d+l*b;return c};_.rotateZ=function(a,b,c){let d=Math.sin(b);b=Math.cos(b);let e=a[0],g=a[1],f=a[2],h=a[3],i=a[4],j=a[5],k=a[6],l=a[7];if(c){if(a!=c){c[8]=a[8];c[9]=a[9];c[10]=a[10];c[11]=a[11];c[12]=a[12];c[13]=a[13];c[14]=a[14];c[15]=a[15]}}else c=a;c[0]=e*b+i*d;c[1]=g*b+j*d;c[2]=f*b+k*d;c[3]=h*b+l*d;c[4]=e*-d+i*b;c[5]=g*-d+j*b;c[6]=f*-d+k*b;c[7]=h*-d+l*b;return c};_.frustum=function(a,b,c,d,e,g,f){f||(f=_.create());let h=b-a,i=d-c,j=g-e;f[0]=e*2/h;f[1]=0;f[2]=0;f[3]=0;f[4]=0;f[5]=e*2/i;f[6]=0;f[7]=0;f[8]=(b+a)/h;f[9]=(d+c)/i;f[10]=-(g+e)/j;f[11]=-1;f[12]=0;f[13]=0;f[14]=-(g*e*2)/j;f[15]=0;return f};_.perspective=function(a,b,c,d,e){a=c*Math.tan(a*Math.PI/360);b=a*b;return _.frustum(-b,b,-a,a,c,d,e)};_.ortho=function(a,b,c,d,e,g,f){f||(f=_.create());let h=b-a,i=d-c,j=g-e;f[0]=2/h;f[1]=0;f[2]=0;f[3]=0;f[4]=0;f[5]=2/i;f[6]=0;f[7]=0;f[8]=0;f[9]=0;f[10]=-2/j;f[11]=0;f[12]=-(a+b)/h;f[13]=-(d+c)/i;f[14]=-(g+e)/j;f[15]=1;return f};_.lookAt=function(a,b,c,d){d||(d=_.create());let e=a[0],g=a[1];a=a[2];let f=c[0],h=c[1],i=c[2];c=b[1];let j=b[2];if(e==b[0]&&g==c&&a==j)return _.identity(d);let k,l,o,m;c=e-b[0];j=g-b[1];b=a-b[2];m=1/Math.sqrt(c*c+j*j+b*b);c*=m;j*=m;b*=m;k=h*b-i*j;i=i*c-f*b;f=f*j-h*c;if(m=Math.sqrt(k*k+i*i+f*f)){m=1/m;k*=m;i*=m;f*=m}else f=i=k=0;h=j*f-b*i;l=b*k-c*f;o=c*i-j*k;if(m=Math.sqrt(h*h+l*l+o*o)){m=1/m;h*=m;l*=m;o*=m}else o=l=h=0;d[0]=k;d[1]=h;d[2]=c;d[3]=0;d[4]=i;d[5]=l;d[6]=j;d[7]=0;d[8]=f;d[9]=o;d[10]=b;d[11]=0;d[12]=-(k*e+i*g+f*a);d[13]=-(h*e+l*g+o*a);d[14]=-(c*e+j*g+b*a);d[15]=1;return d};return _}();let Shader=function(){let _=Object.create(null);_.POSITION_ATTRIBUTE="POSITION_ATTRIBUTE";_.NORMAL_ATTRIBUTE="NORMAL_ATTRIBUTE";_.TEXTURE_ATTRIBUTE="TEXTURE_ATTRIBUTE";let currentShader;_.construct=function(vertexShaderUrl,fragmentShaderUrl,attributeMapping){let getSource=function(url){let request=new XMLHttpRequest;request.open("GET",url,false);request.send(null);return request.status===200?request.responseText:null};let compileShader=function(url,type){let compiledShader=null;let src=getSource(url);if(src!==null){let tmpShader=context.createShader(type);context.shaderSource(tmpShader,src);context.compileShader(tmpShader);if(!context.getShaderParameter(tmpShader,context.COMPILE_STATUS)){}else{compiledShader=tmpShader}}return compiledShader};let vertexShader=compileShader(vertexShaderUrl,context.VERTEX_SHADER);let fragmentShader=compileShader(fragmentShaderUrl,context.FRAGMENT_SHADER);let program=this.program=context.createProgram();context.attachShader(program,vertexShader);context.attachShader(program,fragmentShader);context.linkProgram(program);if(!context.getProgramParameter(program,context.LINK_STATUS)){}context.useProgram(program);for(let i=0,end=context.getProgramParameter(program,context.ACTIVE_UNIFORMS);i<end;i++){let shaderParameter=ShaderParameter.new(program,i);this["set"+Utility.uppercase(shaderParameter.name)]=function(value){shaderParameter.set(value)}}let reverseAttributeMapping=Object.create(null);reverseAttributeMapping[attributeMapping.POSITION_ATTRIBUTE]=_.POSITION_ATTRIBUTE;reverseAttributeMapping[attributeMapping.NORMAL_ATTRIBUTE]=_.NORMAL_ATTRIBUTE;reverseAttributeMapping[attributeMapping.TEXTURE_ATTRIBUTE]=_.TEXTURE_ATTRIBUTE;let attributes=this.attributes=Object.create(null);for(let i=0,end=context.getProgramParameter(program,context.ACTIVE_ATTRIBUTES);i<end;i++){let activeAttribute=context.getActiveAttrib(program,i);let name=activeAttribute.name;if(name in reverseAttributeMapping){attributes[reverseAttributeMapping[name]]=ShaderAttribute.new(program,activeAttribute)}}return this};let bindAttribute=function(which,buffer){if(which in currentShader.attributes){context.bindBuffer(context.ARRAY_BUFFER,buffer);currentShader.attributes[which].bind()}return Shader};_.bindPositionAttribute=function(buffer){return bindAttribute(_.POSITION_ATTRIBUTE,buffer)};_.bindNormalAttribute=function(buffer){return bindAttribute(_.NORMAL_ATTRIBUTE,buffer)};_.bindTextureAttribute=function(buffer){return bindAttribute(_.TEXTURE_ATTRIBUTE,buffer)};_.getCurrentShader=function(){return currentShader};_.use=function(){if(currentShader!==this){currentShader=this;context.useProgram(this.program)}return this};_.new=function(vertexShaderUrl,fragmentShaderUrl,attributeMapping){attributeMapping=typeof attributeMapping!=="undefined"?attributeMapping:{POSITION_ATTRIBUTE:"inputPosition",NORMAL_ATTRIBUTE:"inputNormal",TEXTURE_ATTRIBUTE:"inputTexture"};return Object.create(_).construct(vertexShaderUrl,fragmentShaderUrl,attributeMapping)};return _}();let ShaderParameter=function(){let _=Object.create(null);_.construct=function(program,i){let activeUniform=context.getActiveUniform(program,i);this.name=activeUniform.name;this.type=activeUniform.type;this.location=context.getUniformLocation(program,activeUniform.name);return this};_.set=function(value){switch(this.type){case 5124:context.uniform1i(this.location,value);break;case 35667:context.uniform2iv(this.location,value);break;case 35668:context.uniform3iv(this.location,value);break;case 35669:context.uniform4iv(this.location,value);break;case 5126:context.uniform1f(this.location,value);break;case 35664:context.uniform2fv(this.location,value);break;case 35665:context.uniform3fv(this.location,value);break;case 35666:context.uniform4fv(this.location,value);break;case 35674:context.uniformMatrix2fv(this.location,false,value);break;case 35675:context.uniformMatrix3fv(this.location,false,value);break;case 35676:context.uniformMatrix4fv(this.location,false,value);break}};_.new=function(program,i){return Object.create(_).construct(program,i)};return _}();let ShaderAttribute=function(){let _=Object.create(null);_.construct=function(program,activeAttribute){this.name=activeAttribute.name;this.type=activeAttribute.type;this.location=context.getAttribLocation(program,this.name);context.enableVertexAttribArray(this.location);switch(this.type){case 5124:this.bind=function(){context.vertexAttribPointer(this.location,1,context.INT,false,0,0)};break;case 35667:this.bind=function(){context.vertexAttribPointer(this.location,2,context.INT,false,0,0)};break;case 35668:this.bind=function(){context.vertexAttribPointer(this.location,3,context.INT,false,0,0)};break;case 35669:this.bind=function(){context.vertexAttribPointer(this.location,4,context.INT,false,0,0)};break;case 5126:this.bind=function(){context.vertexAttribPointer(this.location,1,context.FLOAT,false,0,0)};break;case 35664:this.bind=function(){context.vertexAttribPointer(this.location,2,context.FLOAT,false,0,0)};break;case 35665:this.bind=function(){context.vertexAttribPointer(this.location,3,context.FLOAT,false,0,0)};break;case 35666:this.bind=function(){context.vertexAttribPointer(this.location,4,context.FLOAT,false,0,0)};break}return this};_.new=function(program,activeAttribute){return Object.create(_).construct(program,activeAttribute)};return _}();let Node=function(){let _=Object.create(null);let nodes=Object.create(null);_.construct=function(parameters){let HAS_TRANSFORM=1;let HAS_STATE=2;let HAS_SHAPE=4;let HAS_CHILDREN=8;let traverseFunctionIndex=0;if(typeof parameters!=="undefined"){if("name"in parameters){this.name=parameters.name;nodes[this.name]=this}if("transform"in parameters){this.transform=parameters.transform;traverseFunctionIndex+=HAS_TRANSFORM}if("state"in parameters){this.state=parameters.state;traverseFunctionIndex+=HAS_STATE}if("shape"in parameters){this.shape=Shape.get(parameters.shape);traverseFunctionIndex+=HAS_SHAPE}if(!("children"in parameters)||parameters.children==true){this.children=[];traverseFunctionIndex+=HAS_CHILDREN}}else{this.children=[];traverseFunctionIndex+=HAS_CHILDREN}let INVALID_TRAVERSE=function(transform){};this.traverse=[INVALID_TRAVERSE,INVALID_TRAVERSE,INVALID_TRAVERSE,INVALID_TRAVERSE,function(transform){Shader.getCurrentShader().setModelMatrix(transform);this.shape.draw()},function(transform){transform=Float4x4.multiply(transform,this.transform);Shader.getCurrentShader().setModelMatrix(transform);this.shape.draw()},function(transform){this.state();Shader.getCurrentShader().setModelMatrix(transform);this.shape.draw()},function(transform){this.state();transform=Float4x4.multiply(transform,this.transform);Shader.getCurrentShader().setModelMatrix(transform);this.shape.draw()},function(transform){for(let child of this.children){child.traverse(transform)}},function(transform){transform=Float4x4.multiply(transform,this.transform);for(let child of this.children){child.traverse(transform)}},function(transform){this.state();for(let child of this.children){child.traverse(transform)}},function(transform){this.state();transform=Float4x4.multiply(transform,this.transform);for(let child of this.children){child.traverse(transform)}},function(transform){Shader.getCurrentShader().setModelMatrix(transform);this.shape.draw();for(let child of this.children){child.traverse(transform)}},function(transform){transform=Float4x4.multiply(transform,this.transform);Shader.getCurrentShader().setModelMatrix(transform);this.shape.draw();for(let child of this.children){child.traverse(transform)}},function(transform){this.state();Shader.getCurrentShader().setModelMatrix(transform);this.shape.draw();for(let child of this.children){child.traverse(transform)}},function(transform){this.state();transform=Float4x4.multiply(transform,this.transform);Shader.getCurrentShader().setModelMatrix(transform);this.shape.draw();for(let child of this.children){child.traverse(transform)}}][traverseFunctionIndex];return this};_.addChild=function(node){this.children.push(node)};_.getName=function(){return"name"in this?this.name:"node"};_.get=function(name){return nodes[name]};_.new=function(parameters){return Object.create(_).construct(parameters)};return _}();let Cloud=function(){let _=Object.create(Node);_.addPoint=function(point){let transform=Float4x4.translate(Float4x4.identity(),point);transform=Float4x4.multiply(Float4x4.scale([.025,.025,.025]),transform);this.addChild(Node.new({transform:transform,shape:"sphere",children:false}))};_.new=function(parameters){return Object.create(_).construct(parameters)};return _}();let Shape=function(){let _=Object.create(null);let shapes=Object.create(null);let currentShape;_.construct=function(name,buffers){this.name=name;let makeBuffer=function(bufferType,source,itemSize){let buffer=context.createBuffer();context.bindBuffer(bufferType,buffer);context.bufferData(bufferType,source,context.STATIC_DRAW);buffer.itemSize=itemSize;buffer.numItems=source.length/itemSize;return buffer};let HAS_NORMAL=1;let HAS_TEXTURE=2;let HAS_INDEX=4;let drawFunctionIndex=0;if("position"in buffers){this.positionBuffer=makeBuffer(context.ARRAY_BUFFER,new Float32Array(buffers.position),3)}else{}if("normal"in buffers){this.normalBuffer=makeBuffer(context.ARRAY_BUFFER,new Float32Array(buffers.normal),3);drawFunctionIndex+=HAS_NORMAL}if("texture"in buffers){this.normalBuffer=makeBuffer(context.ARRAY_BUFFER,new Float32Array(buffers.texture),2);drawFunctionIndex+=HAS_TEXTURE}if("index"in buffers){this.indexBuffer=makeBuffer(context.ELEMENT_ARRAY_BUFFER,new Uint16Array(buffers.index),1);drawFunctionIndex+=HAS_INDEX}this.draw=[function(){if(this.setCurrentShape()){Shader.bindPositionAttribute(this.positionBuffer)}context.drawArrays(context.TRIANGLES,0,this.positionBuffer.numItems)},function(){if(this.setCurrentShape()){Shader.bindPositionAttribute(this.positionBuffer).bindNormalAttribute(this.normalBuffer)}context.drawArrays(context.TRIANGLES,0,this.positionBuffer.numItems)},function(){if(this.setCurrentShape()){Shader.bindPositionAttribute(this.positionBuffer).bindTextureAttribute(this.textureBuffer)}context.drawArrays(context.TRIANGLES,0,this.positionBuffer.numItems)},function(){if(this.setCurrentShape()){Shader.bindPositionAttribute(this.positionBuffer).bindNormalAttribute(this.normalBuffer).bindTextureAttribute(this.textureBuffer)}context.drawArrays(context.TRIANGLES,0,this.positionBuffer.numItems)},function(){if(this.setCurrentShape()){Shader.bindPositionAttribute(this.positionBuffer);context.bindBuffer(context.ELEMENT_ARRAY_BUFFER,this.indexBuffer)}context.drawElements(context.TRIANGLES,this.indexBuffer.numItems,context.UNSIGNED_SHORT,0)},function(){if(this.setCurrentShape()){Shader.bindPositionAttribute(this.positionBuffer).bindNormalAttribute(this.normalBuffer);context.bindBuffer(context.ELEMENT_ARRAY_BUFFER,this.indexBuffer)}context.drawElements(context.TRIANGLES,this.indexBuffer.numItems,context.UNSIGNED_SHORT,0)},function(){if(this.setCurrentShape()){Shader.bindPositionAttribute(this.positionBuffer).bindTextureAttribute(this.textureBuffer);context.bindBuffer(context.ELEMENT_ARRAY_BUFFER,this.indexBuffer)}context.drawElements(context.TRIANGLES,this.indexBuffer.numItems,context.UNSIGNED_SHORT,0)},function(){if(this.setCurrentShape()){Shader.bindPositionAttribute(this.positionBuffer).bindNormalAttribute(this.normalBuffer).bindTextureAttribute(this.textureBuffer);context.bindBuffer(context.ELEMENT_ARRAY_BUFFER,this.indexBuffer)}context.drawElements(context.TRIANGLES,this.indexBuffer.numItems,context.UNSIGNED_SHORT,0)}][drawFunctionIndex];return this};_.setCurrentShape=function(){if(currentShape!==this){currentShape=this;return true}return false};_.new=function(name,buffers){return shapes[name]=Object.create(_).construct(name,buffers())};_.get=function(name){return shapes[name]};return _}();let makeFacets=function(buffers){let vertex=[];let normal=[];for(let face of buffers.face){let a=buffers.vertex[face[0]];let b=buffers.vertex[face[1]];let c=buffers.vertex[face[2]];let ab=Float3.normalize(Float3.subtract(b,a));let bc=Float3.normalize(Float3.subtract(c,b));let n=Float3.cross(ab,bc);for(let i=0;i<face.length;++i){vertex.push(buffers.vertex[face[i]]);normal.push(n)}}return{position:Utility.flatten(vertex),normal:Utility.flatten(normal)}};let makeCube=function(){return Shape.new("cube",function(){return makeFacets({vertex:[[-1,-1,-1],[-1,1,-1],[1,1,-1],[1,-1,-1],[-1,-1,1],[-1,1,1],[1,1,1],[1,-1,1]],face:[[0,1,2,0,2,3],[7,6,5,7,5,4],[1,5,6,1,6,2],[4,0,3,4,3,7],[4,5,1,4,1,0],[3,2,6,3,6,7]]})})};let makeTetrahedron=function(){return Shape.new("tetrahedron",function(){let overSqrt2=1/Math.sqrt(2);return makeFacets({vertex:[[1,0,-overSqrt2],[-1,0,-overSqrt2],[0,1,overSqrt2],[0,-1,overSqrt2]],face:[[0,1,2],[1,3,2],[2,3,0],[3,1,0]]})})};let makeSphere=function(subdivisions){return Shape.new("sphere",function(){let overSqrt2=1/Math.sqrt(2);let vertices=[Float3.normalize([1,0,-overSqrt2]),Float3.normalize([-1,0,-overSqrt2]),Float3.normalize([0,1,overSqrt2]),Float3.normalize([0,-1,overSqrt2])];let indices=[[0,1,2],[1,3,2],[2,3,0],[3,1,0]];let subdivide=function(){let tri=indices.splice(0,1)[0];let v0=vertices.length;vertices.push(Float3.normalize(Float3.add(vertices[tri[0]],vertices[tri[1]])));let v1=vertices.length;vertices.push(Float3.normalize(Float3.add(vertices[tri[1]],vertices[tri[2]])));let v2=vertices.length;vertices.push(Float3.normalize(Float3.add(vertices[tri[2]],vertices[tri[0]])));indices.push([tri[0],v0,v2]);indices.push([tri[1],v1,v0]);indices.push([tri[2],v2,v1]);indices.push([v0,v1,v2])};for(let j=0;j<subdivisions;++j){for(let i=0,iEnd=indices.length;i<iEnd;++i){subdivide(0)}}return{position:Utility.flatten(vertices),index:Utility.flatten(indices)}})};let makeSquare=function(){return Shape.new("square",function(){return makeFacets({vertex:[[-1,-1,0],[-1,1,0],[1,1,0],[1,-1,0]],face:[[2,1,3,1,0,3]]})})};let Utility=function(){let _=Object.create(null);_.degreesToRadians=function(degrees){return degrees/180*Math.PI};_.radiansToDegrees=function(radians){return radians/Math.PI*180};_.uppercase=function(string){return string[0].toUpperCase()+string.slice(1)};_.lowercase=function(string){return string[0].toLowerCase()+string.slice(1)};_.flatten=function(array){let result=[];for(let element of array){for(let value of element){result.push(value)}}return result};return _}();