var app = require('koa')(),
	logger = require('koa-logger'),
	bodyparser = require('koa-bodyparser'),
	staticCache = require('koa-static-cache'),
	errorhandler = require('koa-errorhandler'),
	session = require('koa-generic-session'),
	MongoStore = require('koa-generic-session-mongo'),
	flash = require('koa-flash'),
	gzip = require('koa-gzip'),
	scheme = require('koa-scheme'),
	router = require('koa-frouter'),
	routerCache = require('koa-router-cache'),
	render = require('co-ejs'),
	config = require('config-lite'),

	merge = require('merge-descriptors'),
	core = require('./lib/core'),
	renderConf = require(config.renderConf);

merge(renderConf.locals || {}, core, false);

app.keys = [renderConf.locals.$app.name];

app.use(errorhandler());
app.use(bodyparser());
app.use(staticCache(config.staticCacheConf));
app.use(logger());
app.use(session({
	store: new MongoStore(config.mongodb)
}));
app.use(flash());
app.use(scheme(config.schemeConf));
app.use(routerCache(app, config.routerCacheConf));
app.use(gzip());
app.use(render(app, renderConf));
app.use(router(app, config.routerConf));

app.listen(config.port, function() {
	console.log('Server is listening on: ', config.port);
});