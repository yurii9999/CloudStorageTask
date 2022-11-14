"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const swagger_ui_dist_1 = __importDefault(require("swagger-ui-dist"));
function setupSwaggerUI(app) {
    const serveSwaggerDef = function serveSwaggerDef(req, res) {
        res.sendFile(path_1.default.resolve(__dirname + '/../../documentation/openapi.json'));
    };
    app.get('/documentation-config', serveSwaggerDef);
    const swaggerUiAssetPath = swagger_ui_dist_1.default.getAbsoluteFSPath();
    const swaggerFiles = express_1.default.static(swaggerUiAssetPath);
    const urlRegex = /url: "[^"]*",/;
    const patchIndex = function patchIndex(req, res) {
        const indexContent = fs_1.default
            .readFileSync(`${swaggerUiAssetPath}/index.html`)
            .toString()
            .replace(urlRegex, 'url: "../documentation-config",');
        res.send(indexContent);
    };
    app.get('/documentation', function getSwaggerRoot(req, res) {
        let targetUrl = req.originalUrl;
        if (!targetUrl.endsWith('/')) {
            targetUrl += '/';
        }
        targetUrl += 'index.html';
        res.redirect(targetUrl);
    });
    app.get('/documentation/index.html', patchIndex);
    app.use('/documentation', swaggerFiles);
}
exports.default = setupSwaggerUI;
//# sourceMappingURL=swaggerDocumentation.js.map