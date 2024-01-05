/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types

import './SButton.css';

function SButton({Icon,Handle}) {
  return (
    <div className="SButton">
      <button onClick={Handle} data-tooltip='' className='SChild'>
            {Icon}
      </button>
    </div>
  )
}


export default SButton
