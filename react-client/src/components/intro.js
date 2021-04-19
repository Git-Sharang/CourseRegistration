import React from "react";

function toggleHidden() {
  this.setState({
    isHidden: !this.state.isHidden
  })
}
function Intro() {

  return (
    <div>
      <div class="py-5 text-center" className="intro">
        <h1>Student-Course App</h1>
      </div>
    </div>
  );
}


export default Intro;