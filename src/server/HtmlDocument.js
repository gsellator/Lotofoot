import React, { PropTypes } from "react";
import { trackingId } from "../config";
import ga from "./ga";
import typekit from "./typekit";
import { provideContext } from "fluxible-addons-react";

class HtmlDocument extends React.Component {
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
    const htmlHead = this.context.getStore("HtmlHeadStore");

    let prefStr = 'http://localhost:3001';
    let meta1, meta2, meta3, meta4;

    /*if (process.env.APP_ENV === 'hub-pre'){
      prefStr = '';
      meta1 = <link rel="apple-touch-icon" sizes="120x120" href="/assets/icns_120x120-pre.png" />;
      meta2 = <link rel="icon" type="image/png" sizes="192x192" href="/assets/icns_192x192-pre.png" />;
      meta3 = <link rel="manifest" href="/icns_manifest-pre.json" />;
      meta4 = <meta name="msapplication-config" content="/assets/icns_browserconfig.xml" />;
    } else*/ if (process.env.NODE_ENV === 'production'){
      prefStr = '';
      meta1 = <link rel="apple-touch-icon" sizes="120x120" href="/assets/icns_120x120.png" />;
      meta2 = <link rel="icon" type="image/png" sizes="192x192" href="/assets/icns_192x192.png" />;
      meta3 = <link rel="manifest" href="/icns_manifest.json" />;
      meta4 = <meta name="msapplication-config" content="/assets/icns_browserconfig.xml" />;
    }

    return (
      <html lang="fr">
        <head>
          <meta charSet="utf-8" />
          <title>{ htmlHead.getTitle() }</title>
          <meta name="description" content={ htmlHead.getDescription() } />

          <meta name="HandheldFriendly" content="true" />
          <meta name="MobileOptimized" content="width" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
          <meta name="apple-mobile-web-app-title" content="Hub" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta name="google-site-verification" content="u_jMeVlqwU6m_mQM6s6L9WCoOWeeB3t-kv9MM1obJ_M" />
          <meta name="format-detection" content="telephone=no" />

          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={ htmlHead.getSiteName() } />
          <meta property="og:title" content={ htmlHead.getTitle() } />
          <meta property="og:description" content={ htmlHead.getDescription() } />
          <meta property="og:url" content={ htmlHead.getCurrentUrl() } />

          <link rel="apple-touch-icon" sizes="57x57" href={prefStr + '/assets/icns_57x57.png'} />
          <link rel="apple-touch-icon" sizes="60x60" href={prefStr + '/assets/icns_60x60.png'} />
          <link rel="apple-touch-icon" sizes="72x72" href={prefStr + '/assets/icns_72x72.png'} />
          <link rel="apple-touch-icon" sizes="76x76" href={prefStr + '/assets/icns_76x76.png'} />
          <link rel="apple-touch-icon" sizes="114x114" href={prefStr + '/assets/icns_114x114.png'} />
          {meta1}
          <link rel="apple-touch-icon" sizes="144x144" href={prefStr + '/assets/icns_144x144.png'} />
          <link rel="apple-touch-icon" sizes="152x152" href={prefStr + '/assets/icns_152x152.png'} />
          <link rel="apple-touch-icon" sizes="180x180" href={prefStr + '/assets/icns_180x180.png'} />
          <link rel="icon" type="image/png" sizes="32x32" href={prefStr + '/assets/icns_fav_32x32.png'} />
          {meta2}
          <link rel="icon" type="image/png" sizes="96x96" href={prefStr + '/assets/icns_fav_96x96.png'} />
          {meta3}
          <link rel="mask-icon" href={prefStr + '/assets/icns.svg'} color="#adc5f0" />
          {meta4}
          <meta name="msapplication-TileColor" content="#adc5f0" />
          <meta name="msapplication-TileImage" content={prefStr + '/assets/icn_144x144.png'} />
          <meta name="theme-color" content="#FFFFFF" />

          { css.map((href, k) =>
            <link key={k} rel="stylesheet" type="text/css" href={href} />)
          }

          {trackingId &&
            <script dangerouslySetInnerHTML={{__html: ga.prod.replace("{trackingId}", trackingId)}} />
          }

          <script dangerouslySetInnerHTML={{__html: typekit}} />
        </head>

        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: markup}} />
          <script dangerouslySetInnerHTML={{__html: state}} />
          { script.map((src, k) => <script key={k} src={src} />) }
        </body>
      </html>
    );
  }
}

HtmlDocument = provideContext(HtmlDocument);

export default HtmlDocument;
