import React, { Component } from "react";
import PropTypes from 'prop-types';
import config from "../config";
import ga from "./ga";
import typekit from "./typekit";
import { provideContext } from "fluxible-addons-react";

class HtmlDocument extends Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
    state: PropTypes.string.isRequired,
    markup: PropTypes.string.isRequired,
    script: PropTypes.arrayOf(PropTypes.string),
    css: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultProps = {
    script: [],
    css: []
  }

  static contextTypes = {
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { state, markup, script, css } = this.props;
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    const print = route.query.print;

    let prefStr = '';
    let meta1, meta2, meta3, meta4, meta5, meta6;

    if (config.appEnv === 'dev'){
      prefStr = 'http://localhost:3001';
      meta1 = <meta name="google-site-verification" content="u_jMeVlqwU6m_mQM6s6L9WCoOWeeB3t-kv9MM1obJ_M" />;
      meta2 = <link rel="apple-touch-icon" sizes="120x120" href={prefStr + '/assets/icns_120x120-pre.png'} />;
      meta3 = <link rel="icon" type="image/png" sizes="192x192" href={prefStr + '/assets/icns_192x192-pre.png'} />;
      meta4 = <link rel="manifest" href={prefStr + '/assets/icns_manifest-pre.json'} />;
      meta5 = <meta name="msapplication-config" content={prefStr + '/assets/icns_browserconfig.xml'} />;
      meta6 = <meta name="robots" content="noindex,nofollow" />;
    } else if (config.appEnv === 'prod'){
      meta1 = <meta name="google-site-verification" content="u_jMeVlqwU6m_mQM6s6L9WCoOWeeB3t-kv9MM1obJ_M" />;
      meta2 = <link rel="apple-touch-icon" sizes="120x120" href={prefStr + '/assets/icns_120x120.png'} />;
      meta3 = <link rel="icon" type="image/png" sizes="192x192" href={prefStr + '/assets/icns_192x192.png'} />;
      meta4 = <link rel="manifest" href={prefStr + '/assets/icns_manifest.json'} />;
      meta5 = <meta name="msapplication-config" content="/assets/icns_browserconfig.xml" />;
    }

    return (
      <html lang="fr">
        <head>
          <meta charSet="utf-8" />
          <title>{config.appTitle}</title>
          <meta name="description" content={config.appDescription} />

          <meta name="HandheldFriendly" content="true" />
          <meta name="MobileOptimized" content="width" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
          <meta name="apple-mobile-web-app-title" content={config.appLabel} />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          {meta1}
          <meta name="format-detection" content="telephone=no" />

          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={config.appLabel} />
          <meta property="og:title" content={config.appTitle} />
          <meta property="og:description" content={config.appDescription} />

          <link rel="apple-touch-icon" sizes="57x57" href={prefStr + '/assets/icns_57x57.png'} />
          <link rel="apple-touch-icon" sizes="60x60" href={prefStr + '/assets/icns_60x60.png'} />
          <link rel="apple-touch-icon" sizes="72x72" href={prefStr + '/assets/icns_72x72.png'} />
          <link rel="apple-touch-icon" sizes="76x76" href={prefStr + '/assets/icns_76x76.png'} />
          <link rel="apple-touch-icon" sizes="114x114" href={prefStr + '/assets/icns_114x114.png'} />
          {meta2}
          <link rel="apple-touch-icon" sizes="144x144" href={prefStr + '/assets/icns_144x144.png'} />
          <link rel="apple-touch-icon" sizes="152x152" href={prefStr + '/assets/icns_152x152.png'} />
          <link rel="apple-touch-icon" sizes="180x180" href={prefStr + '/assets/icns_180x180.png'} />
          <link rel="icon" type="image/png" sizes="32x32" href={prefStr + '/assets/icns_fav_32x32.png'} />
          {meta3}
          <link rel="icon" type="image/png" sizes="96x96" href={prefStr + '/assets/icns_fav_96x96.png'} />
          {meta4}
          <link rel="mask-icon" href={prefStr + '/assets/icns.svg'} color="#2d7fbc" />
          {meta5}
          <meta name="msapplication-TileColor" content="#2d7fbc" />
          <meta name="msapplication-TileImage" content={prefStr + '/assets/icn_144x144.png'} />
          <meta name="theme-color" content="#FFFFFF" />
          {meta6}

          { css.map((href, k) =>
            <link key={k} rel="stylesheet" type="text/css" href={href} />)
          }

          {config.trackingId &&
            <script dangerouslySetInnerHTML={{__html: ga.replace("{trackingId}", config.trackingId)}} />
          }

          <script dangerouslySetInnerHTML={{__html: typekit}} />
        </head>

        <body style={{ overflow: print ? 'auto' : 'hidden' }}>
          <div id="root" className={print ? 'print' : ''} dangerouslySetInnerHTML={{__html: markup}} />
          <script dangerouslySetInnerHTML={{__html: state}} />
          { script.map((src, k) => <script key={k} src={src} />) }
        </body>
      </html>
    );
  }
}

HtmlDocument = provideContext(HtmlDocument);

export default HtmlDocument;
