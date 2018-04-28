import React, { Component } from "react";
import Filters from "daily-filters";

if (process.env.BROWSER) {
  require("../../style/Widgets/AccountBlock.scss");
}

class AccountBlock extends Component {
  render() {
    const { labels, data, url, email } = this.props;

    return (
      <div className="AccountBlock Paper">
        <div className="Account">
          <div className="AccountCtnt">
            <div className="icn-100 account"></div>
            <div className="AccountInfos">
              {data && Filters.capitalize(data.firstName) + ' ' + Filters.capitalize(data.lastName)}
              <span>{data && data.email}</span>
            </div>
          </div>

          <div className="AccountActions">
            <a className="TxtBtn" href={'mailto:' + email}>{labels.sendFeedback}</a>
            <button className="TxtBtn" onTouchTap={this.props.logout}>{labels.logout}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountBlock;
