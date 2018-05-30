import React, { Component } from "react";
import labels from "../../labels";

if (process.env.BROWSER) {
  require("../../style/Help/HelpBlock.scss");
}

class HelpBlock extends Component {
  render() {
    const { data, teamsData } = this.props;

    return (
      <div className="HelpBlock">
        <div>
          {labels.helpL1}
        </div>

        <div style={{marginTop: '12px'}}>{labels.helpL2}</div>

        <div className="HelpTable">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>{labels.helpLabel1}</th>
                <th>{labels.helpLabel2}</th>
                <th>{labels.helpLabel3}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{labels.groups}</th>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <th>{labels.p1}</th>
                <td>2</td>
                <td>4</td>
                <td>6</td>
              </tr>
              <tr>
                <th>{labels.p2}</th>
                <td>3</td>
                <td>5</td>
                <td>8</td>
              </tr>
              <tr>
                <th>{labels.p3}</th>
                <td>4</td>
                <td>6</td>
                <td>10</td>
              </tr>
              <tr>
                <th>{labels.p4}</th>
                <td>5</td>
                <td>7</td>
                <td>12</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>{labels.helpL3}</div>
      </div>
    );
  }
}

export default HelpBlock;