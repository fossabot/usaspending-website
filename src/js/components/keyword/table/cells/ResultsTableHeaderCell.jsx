/**
 * ResultsTableHeaderCell.jsx
 * Created by Lizzie Salita 1/16/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ArrowUp, ArrowDown } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    isLast: PropTypes.bool,
    isActive: PropTypes.bool,
    title: PropTypes.string,
    defaultDirection: PropTypes.string,
    currentSort: PropTypes.object,
    updateSort: PropTypes.func,
    sortDisabled: PropTypes.bool
};

const TableHeaderCell = (props) => {
    const clickedSort = (e) => {
        props.updateSort(props.title, e.target.value);
    };

    const clickedDefault = () => {
        // if (props.isActive) {
        //     // toggle the sort direction
        //     let opposite = 'asc';
        //     if (props.currentSort.direction === 'asc') {
        //         opposite = 'desc';
        //     }
        //     props.updateSort(props.title, opposite);
        // }
        // else {
        //     props.updateSort(props.title, props.defaultDirection);
        // }
        // BODGE: don't allow ascending
        if (!props.sortDisabled) {
            props.updateSort(props.title, 'desc');
        }
    };

    // keyboard accessible option
    const pressedKey = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            clickedDefault();
        }
    };

    let lastClass = '';
    if (props.isLast) {
        lastClass = ' last-column';
    }

    // highlight the active arrows
    const activeAsc = '';
    let activeDesc = '';

    if (props.isActive) {
        activeDesc = ' active';
    }

    let sortIcons = '';
    if (!props.sortDisabled) {
        sortIcons = (
            <div className="header-icons">
                <button
                    onClick={clickedSort}
                    className={`sort-icon${activeAsc}`}
                    value="asc"
                    title={`Sort table by ascending ${props.title}`}
                    aria-label={`Sort table by ascending ${props.title}`}>
                    <ArrowUp
                        alt={`Sort table by ascending ${props.title}`} />
                </button>
                <button
                    onClick={clickedSort}
                    className={`sort-icon${activeDesc}`}
                    value="desc"
                    title={`Sort table by descending ${props.title}`}
                    aria-label={`Sort table by descending ${props.title}`}>
                    <ArrowDown
                        alt={`Sort table by descending ${props.title}`} />
                </button>
            </div>
        );
    }

    /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
    // allow keyboard selection of the header cell
    return (
        <div className={`award-result-header-cell ${lastClass}`}>
            <div
                className="cell-content"
                onClick={clickedDefault}
                onKeyDown={pressedKey}
                role="presentation"
                tabIndex={0}>
                <div className="header-sort">
                    <div className="header-label">
                        {props.title}
                    </div>
                    {sortIcons}
                </div>
            </div>
        </div>
    );
    /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
};

TableHeaderCell.propTypes = propTypes;

export default TableHeaderCell;
