import React, {
    Component,
    Fragment
}from 'react';
import {Grid} from '@material-ui/core';
import * as d3 from "d3";
import {
    scaleBand,
    scaleLinear
} from 'd3-scale';
import {
    tsvParse
} from 'd3-dsv';
import {
    max
} from 'd3-array';
import {
    axisBottom,
    axisLeft
} from 'd3-axis';
import {
    select
} from 'd3-selection';
import './barGraph.scss';



// <BarChart/>
export default (props) => {
  console.log("At Graph", props);
  const svgWidth = 1000,
    svgHeight = 500;

  //Note: getting width and height from a variable rather than the elements attribute e.g. svg.attr("width")
  const margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

  const x = scaleBand()
      .rangeRound([0, width])
      .padding(0.1),
    y = scaleLinear().rangeRound([height, 0]);

  const data = tsvParse(props.data, d => {
    d.frequency = +d.frequency;
    return d;
  });

  x.domain(data.map(d => d.label));
  y.domain([0, max(data, d => d.frequency)]);


  return(
    <Fragment>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g
            className="axis axis--x"
            transform={`translate(0, ${height})`}
            ref={node => select(node).call(axisBottom(x))}
          />
          <g className="axis axis--y">
            <g ref={node => select(node).call(axisLeft(y).ticks(10))} />
            {/* {<text transform="rotate(-90)" y="6" dy="0.71em" textAnchor="end">
              Frequency
            </text>} */}
          </g>
          {data.map(d => (
            <rect
              key={d.label+" new"}
              className={"bar " + x.bandwidth()}
              fill={d.color}
              x={x(d.label)}
              y={y(d.frequency)}
              width={x.bandwidth()}
              height={height - y(d.frequency)}
            />
          ))}
        </g>
      </svg>
      <Grid container className="colorBar mar-large-top">
          {
            data.map((n, i) => {
              return (
                <Grid className="colorBarItem" item key={i} sm={6} md={4} lg={3} xs={12}>
                  <i color={n.color} style={{backgroundColor: n.color}}></i>
                 <span>{n.label}</span>
                </Grid>
              )
            })
          }
          
      </Grid>
  </Fragment>
)};