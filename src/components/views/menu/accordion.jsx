import React, { Component } from 'react';
import greenDownload from './../../../assets/green-circle-downloading-png-3.png';
    

const Accordion = React.createClass({

  componentWillMount () {
    let accordion = [];
    
    this.props.data.forEach((i) => {
      accordion.push({
        title: i.title, 
        content: i.content, 
        open: false
      });
    });
    
    this.setState({
      accordionItems: accordion
    });
  },
  
  click (i) {
    const newAccordion = this.state.accordionItems.slice();
    const index = newAccordion.indexOf(i)
    
    newAccordion[index].open = !newAccordion[index].open;
    this.setState({accordionItems: newAccordion});
  },
  
    render () {
    const sections = this.state.accordionItems.map((i) => (
      <div style={ thing } key={this.state.accordionItems.indexOf(i)}>
        <div className="title" onClick={this.click.bind(null, i)}>
         <span style={ thing2 } className="title-text">
           {i.title}
         </span>
       </div>
       <div className={i.open 
         ? "content content-open" 
         : "content"}
        >
          <div className={i.open 
            ? "content-text content-text-open" 
            : "content-text"}
          > {i.content}
          </div>
        </div>
      </div>
    ));
    
    return (
      <div className="accordion">
        {sections}
      </div>
    );
   }
});

const styles = {
	borderStyle: 'solid',
	borderColor: 'green',
}

const thing = {
  overflowY: 'scroll',
  // below why is maxWidth needed?
  maxWidth: '600px'
  
}

const thing2 = {
   backgroundSize: '18px, 18px',
  // backgroundSize: '15px, 15px',
  backgroundImage: `url(http://files.softicons.com/download/application-icons/ios7-style-icons-by-matias-melian/png/256x256/DownloadsFolder.png)`,
  // backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  paddingLeft: '30px',

}

// const logo = {
//     width: '300px',
//     backgroundImage: `url(${ logoWhite })`,
//     backgroundSize: 'contain',
//     backgroundRepeat: 'no-repeat',
// }



export default Accordion