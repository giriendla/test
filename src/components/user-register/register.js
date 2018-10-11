import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepConnector
} from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles";
import './register.scss';

import RegistrationForm from './registrationForm';

const styles = theme => {
  return {
    root: {
      width: "90%"
    },
    button: {
      marginRight: theme.spacing.unit
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    },
    connectorActive: {
      "& $line": {
        borderColor: theme.palette.secondary.main
      }
    },
    connectorCompleted: {
      "& $line": {
        borderColor: theme.palette.primary.main
      }
    },
    line: {}
  };
};

function getSteps() {
  return ["Company Contact for Compliance", "Company Branch/Local Office Information", "Corporate Office Information", "Billing Location Information", "Service Type Your Company Offer"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Company Contact for Compliance";
    case 1:
      return "Company Branch/Local Office Information";
    case 2:
      return "Corporate Office Information";
    case 3:
      return "Billing Location Information";
    case 4:
      return "Service Type Your Company Offer";
    default:
      return "Unknown step";
  }
}

class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0
    };
    console.log("User Registration", props);
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };
  submitForm = () => {
    alert("Finished From");
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({activeStep: 0});
  };
  assignClasses = (classes) => {
    console.log("Classes", classes);
    return "stepperLabel";
  }

  render() {
    const {classes} = this.props;
    const {activeStep} = this.state;
    const steps = getSteps();

    return (
      <Grid container className={classes.root + " stepperHolder"}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {/* JSON.stringify(classes) */}
          <Stepper
            className="stepperContainer"
            activeStep={activeStep}
            connector={< StepConnector classes = {{ line: classes.line }}/>}
            orientation="horizontal">
            {steps.map(label => (
              <Step key={label}>
                <StepLabel disabled={false}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Fragment>
            {activeStep === steps.length
              ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed - you&quot;re finished
                  </Typography>
                  <Button onClick={this.handleReset} className={classes.button}>
                    Reset
                  </Button>
                </div>
              )
              : (
                <div className="registrationFormContainer">
                  <RegistrationForm
                    {...this.props}
                    component={getStepContent(activeStep)}
                    className={classes.instructions}/>
                  <div className="margin-top-20">
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className="btn btn-secondary">
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(activeStep === steps.length - 1)
                      ? this.submitForm
                      : this.handleNext}
                      className="btn btn-primary">
                      {activeStep === steps.length - 1
                        ? "Finish"
                        : "Next"}
                    </Button>
                  </div>
                </div>
              )}
          </Fragment>
        </Grid>
      </Grid>
    );
  }
}

UserRegistration.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = state => {
  return {state: state}
}

export default connect(mapStateToProps)(withStyles(styles)(UserRegistration));
