import React, { PropTypes, Component } from "react";
import Labels from "../../Labels";
import config from "../../config";

if (process.env.BROWSER) {
  require("../../style/Help/HelpBlock.scss");
}

class HelpBlock extends Component {
  render() {
    const { data, teamsData } = this.props;

    return (
      <div className="HelpBlock">
        {config.appName != 'lotofoot-lecab' &&
          <div>
            {Labels.helpL1}
          </div>
        }
        {config.appName === 'lotofoot-lecab' &&
          <div>
            {Labels.helpL1Alt}
          </div>
        }

        {config.appName === 'lotofoot-lecab' &&
          <div style={{marginTop: '12px'}}>
            Les lots mis en jeu par LeCab sont les suivants :<br/>
            - 1e : Macbook Air<br/>
            - 2e : Bon essence d'une valeur de 300 euros + 1 maillot de foot personnalisé de l'équipe de France<br/>
            - 3e : 2 places pour le match du PSG de votre choix en loge au Parc des Princes<br/>
          </div>
        }

        <div style={{marginTop: '12px'}}>{Labels.helpL2}</div>

        <div className="HelpTable">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>{Labels.helpLabel1}</th>
                <th>{Labels.helpLabel2}</th>
                <th>{Labels.helpLabel3}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{Labels.groups}</th>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <th>{Labels.p1}</th>
                <td>2</td>
                <td>4</td>
                <td>6</td>
              </tr>
              <tr>
                <th>{Labels.p2}</th>
                <td>3</td>
                <td>5</td>
                <td>8</td>
              </tr>
              <tr>
                <th>{Labels.p3}</th>
                <td>4</td>
                <td>6</td>
                <td>10</td>
              </tr>
              <tr>
                <th>{Labels.p4}</th>
                <td>5</td>
                <td>7</td>
                <td>12</td>
              </tr>
            </tbody>
          </table>
        </div>

        {config.appName != 'lotofoot-lecab' &&
          <div>{Labels.helpL6}</div>
        }
        {config.appName === 'lotofoot-lecab' &&
          <div>{'Seuls les chauffeurs-partenaires LeCab pourront recevoir les lots mis en jeu. ' + Labels.helpL6}</div>
        }
      </div>
    );
  }
}

export default HelpBlock;
