import React, { Component } from "react";
import PropTypes from 'prop-types';

import config from "../../config";
import labels from "../../labels";
import NavAction from "../../actions/Pages/NavAction";
import NavHelper from "../Helpers/NavHelper";

if (process.env.BROWSER) {
  require("../../style/Pages/NavFull.scss");
}

class NavFull extends Component {
  constructor(props) {
    super(props);
    this.state = { curSect: '' };
    this.KeyDownHandler = undefined;
  }

  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.KeyDownHandler = this.handleKeyDown.bind(this);
    document.body.addEventListener('keydown', this.KeyDownHandler);
    this.setState({ curSect: this.context.getStore("RouteStore").getCurrentRoute().name });
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.KeyDownHandler);
  }

  handleKeyDown(e){
    // Enter or Esc
    if (e.keyCode === 13 || e.keyCode === 27) {
      this.context.executeAction(NavAction.closeNav);
    }
  }

  sectClick(sect, e){
    if ((!sect.views) || (this.state.curSect === sect.name)){
      this.setState({ curSect: sect.name });
      let navToSectClick = NavHelper.navToSectClick.bind(this, sect.name, sect.defaultView);
      navToSectClick();
    } else {
      e.stopPropagation();
      this.setState({ curSect: sect.name });
    }
  }

  render() {
    const { sections, data } = this.props;
    const { curSect } = this.state;
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    const pageName = route.name;
    const view = route.params.view;

    console.log(sections);
    
    return (
      <nav className="NavFull">
        <div className="MainLink">
          <div className={'btn-36 main full ' + config.appName}></div>
        </div>

        {sections.map(sect =>
          <div key={sect.name}>
            <div className={curSect == sect.name ? 'Link active' : 'Link'} onTouchTap={this.sectClick.bind(this, sect)}>
              <div className={'btn-26 ' + sect.name}></div>
              <span className="LinkTxt">{sect.label}</span>
            </div>

            <div className="SubSects" style={{ 'height' : (sect.views && curSect == sect.name) ? sect.views.length * 34 + 'px' : '0px' }}>
              {sect.views && sect.views.map(subsect =>
                <div key={subsect.name} className={(pageName == sect.name && view == subsect.name) ? 'AltLink active' : 'AltLink'} onTouchTap={NavHelper.navToSectClick.bind(this, sect.name, subsect.name)}>
                  <div className="btn-20 dot"></div>
                  <div className="LinkTxt">
                    {subsect.label}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="LinkSpacer"></div>

        <div className={pageName == 'account' ? 'Link active' : 'Link'} onTouchTap={NavHelper.navToSectClick.bind(this, 'account', '')}>
          <div className="btn-26 account"></div>
          <span className="LinkTxt">{(data && data.username) ? data.username : labels.account}</span>
        </div>
      </nav>
    );
  }
}

export default NavFull;