import React, { Component } from "react";

export default class ErrorBountry extends Component {
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    return <div>ErrorBountry</div>;
  }
}
