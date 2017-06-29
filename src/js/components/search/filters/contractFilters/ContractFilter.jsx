/**
 * ContractFilter.jsx
 * Created by Emily Gullo on 6/23/2017
 */

import React from 'react';
import _ from 'lodash';
import * as Icons from 'components/sharedComponents/icons/Icons';
import * as ContractFieldDefinitions from 'dataMapping/search/contractFields';

import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';

const propTypes = {
    toggleFilter: React.PropTypes.func,
    contractFilterType: React.PropTypes.string,
    contractFilterOptions: React.PropTypes.string,
    contractFilterState: React.PropTypes.string
};

const defaultShown = 4;

const defaultState = {
    shown: defaultShown,
    shownType: 'more'
};

export default class ContractFilter extends React.Component {

    constructor(props) {
        super(props);

        this.state = defaultState;

        // Bind functions
        this.toggleValue = this.toggleValue.bind(this);
        this.generateContractFilters = this.generateContractFilters.bind(this);
        this.toggleShownAmount = this.toggleShownAmount.bind(this);
    }

    toggleShownAmount() {
        const contractFilters = ContractFieldDefinitions[this.props.contractFilterOptions];

        let updatedState = defaultState;

        if (this.state.shownType === 'more') {
            updatedState = {
                shown: Object.keys(contractFilters).length,
                shownType: 'fewer'
            };
        }

        this.setState(updatedState);
    }

    toggleValue(value) {
        this.props.toggleFilter(value);
    }

    generateContractFilters(filters) {
        const contractFilters = [];
        // Creating vars for original filter and inverted filter keys
        const originalFilters = _.keys(filters);
        const invertedFilters = _.keys(_.invert(filters));

        if (contractFilters.length < this.state.shown) {
            // looping on inverted filters
            invertedFilters.sort().forEach((key) => {
                // need access to originalFilter[key] here but is undefined
                if (contractFilters.length <= this.state.shown
                    && (filters.name !== null && filters.name !== '')) {
                    contractFilters.push(
                        <PrimaryCheckboxType
                            {...this.props}
                            key={originalFilters[key]}
                            id={`${this.props.contractFilterOptions}-${key}`}
                            name={key}
                            value={originalFilters[key]}
                            types={ContractFieldDefinitions[this.props.contractFilterOptions]}
                            code={originalFilters[key]}
                            filterType={this.props.contractFilterType}
                            selectedCheckboxes={this.props[this.props.contractFilterState]}
                            toggleCheckboxType={this.toggleValue}
                            enableAnalytics />);
                }
            });
        }

        return contractFilters;
    }

    generateToggleButton() {
        const contractFilters = ContractFieldDefinitions[this.props.contractFilterOptions];
        let toggleButton = null;

        if (contractFilters && Object.keys(contractFilters).length > 4) {
            const remaining = Object.keys(contractFilters).length - this.state.shown;
            let shownStatement = `${remaining} ${this.state.shownType}`;
            let arrow = (<Icons.AngleDown alt={`See ${shownStatement}`} />);

            if (remaining === 0) {
                shownStatement = this.state.shownType;
                arrow = (<Icons.AngleUp alt={`See ${shownStatement}`} />);
            }

            toggleButton = (<button
                className="see-more contract-filter-toggle-button"
                onClick={this.toggleShownAmount}
                title={`See ${shownStatement}`}>
                See {shownStatement}
                &nbsp; {arrow}
            </button>);
        }

        return toggleButton;
    }

    render() {
        const contractFilterItems =
        this.generateContractFilters(ContractFieldDefinitions[this.props.contractFilterOptions]);
        const toggleButton = this.generateToggleButton();

        return (
            <div
                className={`contract-filter search-filter checkbox-type-filter
                    ${this.props.contractFilterType}`}>
                <p className="sub-head">
                    {ContractFieldDefinitions.groupLabels[this.props.contractFilterType]}
                </p>
                <div className="filter-item-wrap">
                    <ul className="contract-types checkbox-types">
                        {contractFilterItems}
                    </ul>
                    {toggleButton}
                </div>
            </div>
        );
    }
}

ContractFilter.propTypes = propTypes;
