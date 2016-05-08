import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink, RouteStore } from "fluxible-router";

if (process.env.BROWSER) {
  require("../style/Pages/HelpPage.scss");
}

class HelpPage extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="HelpPage">
        <div className="Paper">
          <div className="PaperTitle">
             Règles du jeu
          </div>
          <div className="HelpPageCtnt">
            <div>
              Amis Footix, les règles du Lotofoot de l'euro 2016 sont simples.<br/><br/>
              Pour la phase de qualification qui commence le 10 juin, les points à gagner sont les suivants :<br/>
                - 1pt pour le bon gagnant<br/>
                - 1pt pour la bonne différence de but<br/>
                - 1pt pour le score exacte<br/><br/>

              Pour la phase finale qui commence le XX XXXX, les points à gagner sont les suivants :<br/>
                - 1pt pour le bon gagnant<br/>
                - 1pt pour la bonne différence de but<br/>
                - 1pt pour le score exacte<br/><br/>
              Les pronostics peuvent être modifiés jusqu'au début du match.<br/>
              Ne perdons plus de temps. Pronostiquez dès maintenant. Bonne chance !
            </div>
            <div className="Footer">
              En cas de problème ou pour toute question, contactez-nous à l'adresse <a href="mailto:hello@lotofoot.radio97.fr">hello@lotofoot.radio97.fr</a>.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//HelpPage = connectToStores(HelpPage, ["LoginPageStore"], (context) => {
//  return {
//    credentials: context.getStore("LoginPageStore").getCredentials()
//  };
//}, {getStore: PropTypes.func});

export default HelpPage;
