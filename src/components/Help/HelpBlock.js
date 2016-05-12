import React, { PropTypes, Component } from "react";
//import { connectToStores } from "fluxible-addons-react";
//import FormatDate from "../Helpers/FormatDate";
//import Filters from "../Helpers/Filters";

if (process.env.BROWSER) {
  require("../../style/Help/HelpBlock.scss");
}

class HelpBlock extends Component {
//  static contextTypes = {
//    executeAction: PropTypes.func.isRequired,
//    getStore: PropTypes.func.isRequired
//  }

  render() {
    const { data, teamsData } = this.props;

    return (
      <div className="HelpBlock">
        <div>
          Amis Footix, le but de ce lotofoot est de pronostiquer le vainqueur et le score de chaque match de l'Euro.
          Nous tenons compte du score final du match, prolongations incluses.
          Dans le cas d'un match à élimination directe, si vous pronostiquez un match nul, vous devez aussi préciser quelle est
          l'équipe que vous voyez victorieuse à l'issue des tirs aux buts.<br/><br/>

          Le nombre de points que vos pronostics vous rapportent dépendent :<br/>
          - Du stade de la compétition auquel appartient le match (groupes, quarts de finale...)<br/>
          - De l'exactitude de votre pronostic (bon vainqueur, bon vainqueur et bonne différence de buts, bon vainqueur avec le score exact)<br/><br/>

          Les points mis en jeu sont les suivants :
        </div>

        <div className="HelpTable">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Bon vainqueur</th>
                <th>Bonne diff de buts</th>
                <th>Bon score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Groupes</th>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <th>1/8</th>
                <td>2</td>
                <td>4</td>
                <td>6</td>
              </tr>
              <tr>
                <th>1/4</th>
                <td>3</td>
                <td>5</td>
                <td>8</td>
              </tr>
              <tr>
                <th>1/2</th>
                <td>4</td>
                <td>6</td>
                <td>10</td>
              </tr>
              <tr>
                <th>Finale</th>
                <td>5</td>
                <td>7</td>
                <td>12</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          Les pronostics peuvent être modifiés jusqu'au début du match. Bonne chance !
        </div>
      </div>
    );
  }
}

//HelpBlock = connectToStores(HelpBlock, ["HelpBlockStore"], (context) => {
//  return {
//    data: context.getStore("HelpBlockStore").getData(),
//  };
//}, {getStore: PropTypes.func});

export default HelpBlock;
