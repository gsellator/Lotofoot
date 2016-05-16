import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { setSubfilter, setFilter } from "../../actions/Games/GamesTabAction";
//import Labels from "../../constants/Labels";

if (process.env.BROWSER) {
  require("../../style/Games/GamesFilters.scss");
}

class GamesFilters extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
  }

  setFilter(newFilter) {
    this.context.executeAction(setFilter, { newFilter });
  }

  setSubfilter(newSubfilter) {
    this.context.executeAction(setSubfilter, { newSubfilter });
  }

  render() {
    const { filter, subfilter } = this.props;

    return (
      <div className="Paper GamesFilters">
        <div className="FilterSelector">
          <div className={filter === 'match' ? 'FilterBtn Active' : 'FilterBtn'} onClick={this.setFilter.bind(this, 'match')}>
            <div className="FilterLabel">Matchs</div>
          </div>
          <div className={filter === 'group' ? 'FilterBtn Active' : 'FilterBtn'} onClick={this.setFilter.bind(this, 'group')}>
            <div className="FilterLabel">Groupes</div>
          </div>
          <div className={filter === 'finale' ? 'FilterBtn Active' : 'FilterBtn'} onClick={this.setFilter.bind(this, 'finale')}>
            <div className="FilterLabel">Phase finale</div>
          </div>
        </div>

        {filter === 'match' &&
          <div className="SubfilterSelector">
            <div className={subfilter === '-' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '-')}>
              <div className="SubfilterLabel">Tous</div>
            </div>
            <div className={subfilter === '1' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '1')}>
              <div className="SubfilterLabel">À venir</div>
            </div>
            <div className={subfilter === '2' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '2')}>
              <div className="SubfilterLabel">À pronostiquer</div>
            </div>
          </div>
        }
        {filter === 'group' &&
          <div className="SubfilterSelector">
            {false && <div className={subfilter === '-' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '-')}>
              <div className="SubfilterLabel">Tous</div>
            </div>}
            <div className={subfilter === 'a' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'a')}>
              <div className="SubfilterLabel">Groupe A</div>
            </div>
            <div className={subfilter === 'b' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'b')}>
              <div className="SubfilterLabel">Groupe B</div>
            </div>
            <div className={subfilter === 'c' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'c')}>
              <div className="SubfilterLabel">Groupe C</div>
            </div>
            <div className={subfilter === 'd' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'd')}>
              <div className="SubfilterLabel">Groupe D</div>
            </div>
            <div className={subfilter === 'e' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'e')}>
              <div className="SubfilterLabel">Groupe E</div>
            </div>
            <div className={subfilter === 'f' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'f')}>
              <div className="SubfilterLabel">Groupe F</div>
            </div>
          </div>
        }
        {filter === 'finale' &&
          <div className="SubfilterSelector">
            {false && <div className={subfilter === '-' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '-')}>
              <div className="SubfilterLabel">Tous</div>
            </div>}
            <div className={subfilter === '1' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '1')}>
              <div className="SubfilterLabel">1/8</div>
            </div>
            <div className={subfilter === '2' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '2')}>
              <div className="SubfilterLabel">1/4</div>
            </div>
            <div className={subfilter === '3' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '3')}>
              <div className="SubfilterLabel">1/2</div>
            </div>
            <div className={subfilter === '4' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '4')}>
              <div className="SubfilterLabel">Finale</div>
            </div>
          </div>
        }
      </div>
    );
  }
}

GamesFilters = connectToStores(GamesFilters, ["GamesTabStore"], (context) => {
  return {
    filter: context.getStore("GamesTabStore").getFilter(),
    subfilter: context.getStore("GamesTabStore").getSubfilter(),
  };
}, {getStore: PropTypes.func});

export default GamesFilters;
