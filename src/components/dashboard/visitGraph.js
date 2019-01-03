import React, {
    Component,
    Fragment
}from 'react';
import {Grid} from '@material-ui/core';
import * as d3 from "d3";
import {
    scaleBand,
    scaleLinear,
    scaleOrdinal
} from 'd3-scale';
import {
    tsvParse
} from 'd3-dsv';
import {
    max, sum
} from 'd3-array';
import {
    axisBottom,
    axisLeft
} from 'd3-axis';
import {
    select
} from 'd3-selection';
import './barGraph.scss';
import { legendColor } from 'd3-svg-legend'
import { transition } from 'd3-transition'



// <BarChart/>
export default class BarGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            svgWidth: 500,
            svgHeight: 500,
            margin : {top: 10, right: 10, bottom: 10, left: 10},
        };

    }

    render() {
        const { svgHeight, svgWidth, margin } = this.state;
        const { graphData } = this.props;

        const width = svgWidth + (margin.left + margin.right);
        const height = svgHeight + (margin.top + margin.bottom); 
        
        return(
            <Fragment>
                <svg ref={node => this.node = node} width={width} height={height}></svg>
            </Fragment>
        )
    }
};