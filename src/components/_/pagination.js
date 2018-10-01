import React, {Component, Fragment} from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableSortLabel,
  Hidden,
  Grid
} from '@material-ui/core';
import Pagination from 'rc-pagination';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import localeInfo from 'rc-pagination/lib/locale/en_US';

export default class ListComponent extends Component {
  constructor(props) {
    super(props);
    /* console.log("props", props); */
    this.state = {
      pgCurrent: 1,
      pgPerPage: 10
    };
    const totalData = [];
    this.onPaginationChange = this
      .onPaginationChange
      .bind(this);
  }
  componentDidMount() {
    /* this.mediaSize['mobile'] = ['xs'];
    this.mediaSize['desktop'] = ['sm', 'md', 'lg', 'xl']; */
  }
  onPaginationChange = (page) => {
    /* console.log(page); */
    this.setState({pgCurrent: page});
  }
  doPaginate(data) {
    /* this.setState({...this.state, pgData: {data: data}}); */
    this.totalData = data;
  }
  showTotalRows = (data, arr) => {
    let actualData = [];
    for (let i = arr[0]; i <= arr[1]; i++) {
      let row = this.props.data[i - 1];
      actualData.push(row);
    }
    this.totalData = actualData;
    // this.doPaginate(actualData);
    /* console.log("Show Total Rows", data, arr); */
  }
  showPaginate() {
    let array = this.props.data;
    let page_number = this.state.pgCurrent;
    let page_size = this.state.pgPerPage;
    --page_number; // because pages logically start with 1, but technically with 0
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  }

  render() {
    return (
      <Fragment>
        <RenderPageItems data={this.showPaginate()} header={this.props.header}/>
        <Pagination
          defaultCurrent={1}
          onChange={this.onPaginationChange}
          current={this.state.pgCurrent}
          hideOnSinglePage={true}
          locale={localeInfo}
          total={this.props.data.length}
          pageSize={this.state.pgPerPage}/>
      </Fragment>
    );
  }
}

const RenderPageItems = (props) => {
  const data = props;
  const doPaginate = (props) => {
    console.log("At Render Page Items", props);
  }
  doPaginate(props);
  const showOptions = () => {}
  const renderImage = (key, data) => {
    if (key == 0 && data.hasOwnProperty('image')) {
      return (
        <div className="profileImage"><img src={data.image}/></div>
      );
    }
  }

  const rowsRender = () => {
    /* console.log("All Props at child", props); */

    const desktopMedia = ['xs'];
    const mobileMedia = ['sm', 'md', 'lg', 'xl'];

    if (props.data.length > 0) {
      return (
        <Fragment>
          <div className="paginationHolder">
            <Hidden only={desktopMedia}>
              <Table className="listTable">
                <TableHead>
                  <TableRow>
                    {props
                      .header
                      .map((n, i) => {
                        return (
                          <TableCell key={i}>{n}</TableCell>
                        )
                      })}
                    <TableCell>Options</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props
                    .data
                    .map((n, i) => {
                      /* console.log(n) */
                      return (
                        <TableRow key={i}>
                          {props
                            .header
                            .map((k, l) => {
                              return (
                                <TableCell key={l}>
                                  {renderImage(l, n)}
                                  <span>
                                    {n[k]}
                                  </span>
                                </TableCell>
                              )
                            })}
                          <TableCell>
                            <a href="javascript:void(0)"><EditIcon className="icon icon-edit"/></a>
                            <a href="javascript:void(0)"><DeleteIcon className="icon icon-delete"/></a>
                          </TableCell>
                        </TableRow>
                      )
                    })
}
                </TableBody>
              </Table>
            </Hidden>
            <Hidden only={mobileMedia}>
              {props
                .data
                .map((n, i) => {
                  return (
                    <div key={i} className="mobilePagitnationItem">
                      <RenderRow data={n}/>
                    </div>
                  )
                })
}
            </Hidden>
          </div>
        </Fragment>
      )
    } else {
      return (
        <div>
          {/* <h3>No Records to show</h3> */}
        </div>
      )
    }
  }

  return (
    <Fragment>
      {rowsRender(props)}
    </Fragment>
  )
}

const RenderRow = (props) => {
  const view = window.location.pathname;
  const render = () => {
    if (view == "/employees") {
      return (
        <Fragment>
          <Employees {...props.data}/>
        </Fragment>
      )
    } else if (view == "/visit") {
      return (
        <div>Rendering Visit</div>
      )
    } else if (view == "/communities") {
      return (
        <div>Rendering Communities</div>
      )
    } else {
      return (
        <div>No View</div>
      )
    }
  }
  return (
    <div>
      {render()}
      {/* JSON.stringify(props.data) */}
    </div>
  )
}

const Employees = (props) => {
  console.log("At Employees", props);
  return (
    <Fragment>
      <div className="itemRowHeading">
        <h3>
          <span><img src={props.image} className="employeeImage"/></span>
          <span>{props.name}</span>
        </h3>
        <div className="itemRowOptions">
          <a href="javascript:void(0)"><EditIcon className="icon icon-edit"/></a>
          <a href="javascript:void(0)"><DeleteIcon className="icon icon-delete"/></a>
        </div>
      </div>
    <div className="itemRowBody">
      <div>
        <b>Phone</b> <span>{props.phone}</span>
      </div>
      <div>
        <b>Email</b> <span>{props.email}</span>
      </div>
      <div>
        <b>Company</b> <span>{props.company.name}</span>
      </div>
      <div>
        <b>Company</b> <span>{props.company.name}</span>
      </div>
      <div>
        <b>Address</b> 
        <span>
          {`${props.address.suite}, ${props.address.street}, ${props.address.city} - ${props.address.zipcode}`}
        </span>
      </div>
    </div>
    </Fragment>
  )
}