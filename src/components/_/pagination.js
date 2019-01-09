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
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircle from '@material-ui/icons/CheckCircle';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
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
    // debugger;
    let array = this.props.data;
    let page_number = this.state.pgCurrent;
    let page_size = this.state.pgPerPage;
    --page_number; // because pages logically start with 1, but technically with 0
    if(array != null && array.length > 0){
      return array.slice(page_number * page_size, (page_number + 1) * page_size);
    }else{
      return [];
    }
  }

  render() {
    // debugger;
    const {data} = this.props;
    const count = (data == undefined) ? 0 : data.length;
    return (
      <Fragment>
        <RenderPageItems 
              data={this.showPaginate()} 
              header={this.props.header} 
              view={this.props.view}
              rowEdit = {this.props.rowEdit}
              dispuite={this.props.dispuite}
              listDocuments={this.props.listDocuments}/>
        <Pagination
          defaultCurrent={1}
          onChange={this.onPaginationChange}
          current={this.state.pgCurrent}
          hideOnSinglePage={true}
          locale={localeInfo}
          total={count}
          pageSize={this.state.pgPerPage}/>
      </Fragment>
    );
  }
}

const RenderPageItems = (props) => {
  const data = props;
  const desktopMedia = ['xs'];
  const mobileMedia = ['sm', 'md', 'lg', 'xl'];
  const doPaginate = (props) => {
    // console.log("At Render Page Items", props);
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

  const loadView = (props, view) => {
    console.log("At Load View", props, view);
    switch(props.view) {
      case "employees":
        return <Employees {...props} device={view} />;          
      break;
      case "company":
        return <Company {...props} device={view} />;          
      break;
      default: 
        return "No View Found";
    }
  }

  return (
    <Fragment>
      <div className="paginationHolder">
        <Hidden only={desktopMedia}>
          {loadView(props, "desktop")}
        </Hidden>
        <Hidden only={mobileMedia}>
          {loadView(props, "mobile")}
        </Hidden>
      </div>
    </Fragment>
  )
}



const Employees = (props) => {
  console.log("At Employees Table", props);
  const renderImage = (data) => {
    if (data.hasOwnProperty('image')) {
      return (
        <div className="profileImage"><img src={data.image}/></div>
      );
    }
  }
  const editingRow = (id) => {
    // console.log("Editing Row", id);
    props.rowEdit(id);
  }
  const dispuiteEmployee = data => {
    // console.log("Disputing Employee at Pagination", data);
    if(data.status !== "Disputed"){
      props.dispuite(data);
    }
  }
  const listDocuments = data => {
    console.log("Showing List at Pagination of Documents", data);
    props.listDocuments(data);
  }
  const renderView = (props) => {
    console.log("\n\n/////////// At Render View Pagination \n", props);
    if(props.device == "desktop"){
      return (
        <Table className="listTable">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Last Visited</TableCell>
              <TableCell>Status</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props
              .data
              .map((n, i) => {
                /* console.log(n) */
                return (
                  <TableRow key={i}>
                    <TableCell>
                      {renderImage(n)}
                      <span>
                        {n.name}
                      </span>
                    </TableCell>
                    <TableCell>{n.email}</TableCell>
                    <TableCell>{n.phone_mobile}</TableCell>
                    <TableCell>{n.service}</TableCell>
                    <TableCell>{n.lastVisitedData}</TableCell>
                    <TableCell>{n.status}</TableCell>
                    <TableCell numeric className="tableOptionSection">
                      <a href="javascript:void(0)" 
                          onClick={() => {listDocuments(n)}}>
                          <span title="Documents">
                            <LibraryBooks className="icon icon-edit"/>
                          </span>
                      </a>
                      <a href="javascript:void(0)" 
                          onClick={() => {editingRow(n)}}>
                          <span title="Edit">
                            <EditIcon className="icon icon-edit"/>
                          </span>
                      </a>
                      <a href="javascript:void(0)" onClick={() => { dispuiteEmployee(n);}}>
                        {
                          (n.status == "Disputed") 
                            ? <span title="Disputed" style={{cursor: "auto"}}>
                                <DeleteIcon className="icon icon-delete"/>
                              </span>
                            : <span title="Dispute"><DeleteIcon className="icon icon-delete"/></span>
                        }
                      </a>
                      {/* <a href="javascript:void(0)"><DeleteIcon className="icon icon-delete"/></a> */}
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      );
    }else if(props.device === "mobile"){
      return(
        <div className="mobilePagitnationItem">
          <Table className="listTable">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Status</TableCell>
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
                      <TableCell>
                        {renderImage(n)}
                        <span>
                          {n.name}
                        </span>
                      </TableCell>
                      <TableCell>{n.name}</TableCell>
                      <TableCell>{n.name}</TableCell>
                      <TableCell>{n.name}</TableCell>
                      <TableCell>{n.name}</TableCell>
                      <TableCell>
                        <a href="javascript:void(0)" onClick={props.edit(n)} ><EditIcon className="icon icon-edit"/></a>
                        <a href="javascript:void(0)"><DeleteIcon className="icon icon-delete"/></a>
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
      ) 
    }
  }

  return (
    <Fragment>
      {renderView(props)}
    </Fragment>
  )
}
const Company = (props) => {
  console.log("At Company Table", props);

  const editingRow = (id) => {
    // console.log("Editing Row", id);
    props.rowEdit(id);
  }
  const renderView = (props) => {
    console.log("\n\n/////////// At Render View Pagination \n", props);
    if(props.device == "desktop"){
      return (
        <Table className="listTable">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Company Type</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props
              .data
              .map((n, i) => {
                /* console.log(n) */
                return (
                  <TableRow key={i}>
                    <TableCell>{n.name}</TableCell>
                    <TableCell>{n.email}</TableCell>
                    <TableCell>{`
                    ${(n.shipping_street !== null && n.shipping_street !== "") ? n.shipping_street : ""}  
                    ${(n.shipping_city !== null && n.shipping_city !== "") ? ", "+n.shipping_city : ""}  
                    ${(n.shipping_state_abbr !== null && n.shipping_state_abbr !== "") ? ", "+n.shipping_state_abbr : ""}
                    ${(n.shipping_zip !== null && n.shipping_zip !== "") ? ", "+n.shipping_zip : ""}
                    `}</TableCell>
                    <TableCell style={{'textTransform': "uppercase"}}>{n.companyType}</TableCell>
                    <TableCell numeric className="tableOptionSection">
                    {
                      (n.companyType === "child") ?
                      <a href="javascript:void(0)" 
                          onClick={() => {editingRow(n)}}>
                          <span title="Edit">
                            <EditIcon className="icon icon-edit"/>
                          </span>
                      </a> : ""
                    }
                      {/* <a href="javascript:void(0)"><DeleteIcon className="icon icon-delete"/></a> */}
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      );
    }else if(props.device === "mobile"){
      return(
        <div className="mobilePagitnationItem">
        <Table className="listTable">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props
            .data
            .map((n, i) => {
              /* console.log(n) */
              return (
                <TableRow key={i}>
                  <TableCell>{n.name}</TableCell>
                  <TableCell>{n.email}</TableCell>
                  <TableCell>{`
                        ${(n.shipping_street !== null && n.shipping_street !== "") ? n.shipping_street : ""}  
                        ${(n.shipping_city !== null && n.shipping_city !== "") ? ", "+n.shipping_city : ""}  
                        ${(n.shipping_state_abbr !== null && n.shipping_state_abbr !== "") ? ", "+n.shipping_state_abbr : ""}
                        ${(n.shipping_zip !== null && n.shipping_zip !== "") ? ", "+n.shipping_zip : ""}
                      `}</TableCell>
                  <TableCell numeric className="tableOptionSection">                      
                    <a href="javascript:void(0)" 
                        onClick={() => {editingRow(n)}}>
                        <span title="Edit">
                          <EditIcon className="icon icon-edit"/>
                        </span>
                    </a>                      
                    {/* <a href="javascript:void(0)"><DeleteIcon className="icon icon-delete"/></a> */}
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
        </div>
      ) 
    }
  }

  return (
    <Fragment>
      {renderView(props)}
    </Fragment>
  )
}