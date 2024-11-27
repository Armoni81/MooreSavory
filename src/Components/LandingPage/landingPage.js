import React from 'react';
import './styles.css'
import salad from '../../images/Salad.jpg'
import mooreSavoryLogo from '../../images/00.jpeg'
  
  const LandingPage = () =>  {
    const styles = {
       landingPageText : {
        color: 'orange',
        left: 0,
        textAlign:'center',
        fontSize: '54px'
       },
       contentBox: {
            backgroundColor: 'white',
            padding: '120px',
            position:'absolute',
            top: '312px',
            width: '100%'

       }
    }

	return (
	  <div>
        <img src={salad} />
        <img src={mooreSavoryLogo} />
            <div style={styles.landingPageText}>
                <div style={styles.contentBox}>
                    <p>Moore Savory Foods</p>
                </div>
            </div>
	  </div>
	);
  }
  
  export default LandingPage;
  
  