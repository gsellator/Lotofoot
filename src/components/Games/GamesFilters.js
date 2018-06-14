import React, { Component } from "react";
import PropTypes from 'prop-types';
import GamesTabAction from "../../actions/Pages/GamesTabAction";
import labels from "../../labels";

if (process.env.BROWSER) {
  require("../../style/Games/GamesFilters.scss");
}

class GamesFilters extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
  }

  setFilter(newFilter) {
    this.context.executeAction(GamesTabAction.setFilter, { newFilter });
  }

  setSubfilter(newSubfilter) {
    this.context.executeAction(GamesTabAction.setSubfilter, { newSubfilter });
  }

  render() {
    const { filter, subfilter } = this.props;

    return (
      <div className="Paper GamesFilters">
        <div className="FilterSelector">
          <div className={filter === 'match' ? 'FilterBtn Active' : 'FilterBtn'} onClick={this.setFilter.bind(this, 'match')}>
            <div className="FilterLabel">{labels.games}</div>
          </div>
          <div className={filter === 'group' ? 'FilterBtn Active' : 'FilterBtn'} onClick={this.setFilter.bind(this, 'group')}>
            <div className="FilterLabel">{labels.groups}</div>
          </div>
          <div className={filter === 'finale' ? 'FilterBtn Active' : 'FilterBtn'} onClick={this.setFilter.bind(this, 'finale')}>
            <div className="FilterLabel">{labels.knockoutPhase}</div>
          </div>
        </div>

        {filter === 'match' &&
          <div className="SubfilterSelector">
            <div className={subfilter === '1' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '1')}>
              <div className="SubfilterLabel">{labels.toCome}</div>
            </div>
            <div className={subfilter === '2' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '2')}>
              <div className="SubfilterLabel">{labels.toPredict}</div>
            </div>
            <div className={subfilter === '-' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '-')}>
              <div className="SubfilterLabel">{labels.all}</div>
            </div>
          </div>
        }
        {filter === 'group' &&
          <div className="SubfilterSelector">
            <div className={subfilter === 'a' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'a')}>
              <div className="SubfilterLabel">{labels.ga}</div>
            </div>
            <div className={subfilter === 'b' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'b')}>
              <div className="SubfilterLabel">{labels.gb}</div>
            </div>
            <div className={subfilter === 'c' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'c')}>
              <div className="SubfilterLabel">{labels.gc}</div>
            </div>
            <div className={subfilter === 'd' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'd')}>
              <div className="SubfilterLabel">{labels.gd}</div>
            </div>
            <div className={subfilter === 'e' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'e')}>
              <div className="SubfilterLabel">{labels.ge}</div>
            </div>
            <div className={subfilter === 'f' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'f')}>
              <div className="SubfilterLabel">{labels.gf}</div>
            </div>
            <div className={subfilter === 'g' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'g')}>
              <div className="SubfilterLabel">{labels.gg}</div>
            </div>
            <div className={subfilter === 'h' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, 'h')}>
              <div className="SubfilterLabel">{labels.gh}</div>
            </div>
          </div>
        }
        {filter === 'finale' &&
          <div className="SubfilterSelector">
            <div className={subfilter === '1' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '1')}>
              <div className="SubfilterLabel">{labels.p1}</div>
            </div>
            <div className={subfilter === '2' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '2')}>
              <div className="SubfilterLabel">{labels.p2}</div>
            </div>
            <div className={subfilter === '3' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '3')}>
              <div className="SubfilterLabel">{labels.p3}</div>
            </div>
            <div className={subfilter === '4' ? 'SubfilterBtn Active' : 'SubfilterBtn'} onClick={this.setSubfilter.bind(this, '4')}>
              <div className="SubfilterLabel">{labels.p4}</div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default GamesFilters;