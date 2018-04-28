import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connectToStores } from "fluxible-addons-react";
import FormatDate from "../Helpers/FormatDate";

if (process.env.BROWSER) {
  require("../../style/Chat/MessagesTab.scss");
}


class MessagesTab extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  getTextBlock(text) {
    // 🙂  d83d de42
    // 🙁  d83d de41
    // 😎  d83d de0e
    // 😱  d83d de31
    // 🤓  d83e dd13
    // 🤫  d83e dd2b

    const reg = /(\ud83d[\ude42\ude41\ude0e\ude31]|\ud83e[\udd13\udd2b])/g;
    const emojisCount = (text.match(reg) || []).length;

    let emojiSize = '2';
    if (text.length === 2 * emojisCount && text.length <= 4)
      emojiSize = '4';

    const semiHtml = text.replace(reg, '<br/><span class="uiux-emojis m-' + emojiSize + ' $&" /><br/>');
    const array = semiHtml.split('<br/>');

    return (
      <span className={emojisCount > 0 ? 'WithEmojis' : ''}>
        {array && array.map((item, i) => (text[0] === '<') ?
          <span key={i}>{item}</span> :
          <span key={i} dangerouslySetInnerHTML={{ __html: item }} />
        )}
      </span>
    );
  }

  render() {
    const { credentials, data } = this.props;

    return (
      <div className="MessagesTab">
        {credentials && credentials._id &&
          <div>
            {data && data.map((item, i) =>
              <div key={i} className="MessageLine">
                {item.user &&
                  <div className={credentials._id === item.user._id ? 'Me' : ''}>
                    <div className="MessageBlock">
                      <div className="Title">
                        <div className="Name">
                          {item.user && item.user.firstName}
                        </div>
                        <div className="Date">
                          {FormatDate.dtetimeToFromNow(item.createdAt, 'DD/MM')}
                        </div>
                      </div>

                      <div className="Text">
                        {item.text && item.text != '' && this.getTextBlock(item.text)}
                      </div>

                      <div className="icn-16 Phylactery" />
                    </div>
                  </div>
                }
              </div>
            )}
          </div>
        }
      </div>
    );
  }
}

MessagesTab = connectToStores(MessagesTab, ["LoginStore", "MessagesTabStore"], (context) => {
  return {
    credentials: context.getStore("LoginStore").getCredentials(),
    data: context.getStore("MessagesTabStore").getData()
  };
}, {getStore: PropTypes.func});

export default MessagesTab;
