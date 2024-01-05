/* eslint-disable react/no-unknown-property */
import './Sidebar.css';
import SButton from '../../widgets/Sidebar_Button/SButton';
import { useCallContext } from '../../CallContext';

function Sidebar() {
  const {updateSelectedSection}=useCallContext();
  const handleSectionClick = (section) => {
    updateSelectedSection(section);
  };
  return (
    <div className="Sidebar-Container">
      <div className='Icons'>
        <SButton style={{width:'80%'}} Handle={()=> handleSectionClick('AllCalls')} Icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" viewBox="0 0 24 24" fill="none" stroke="#e0e1dd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}/>
        <SButton style={{width:'80%'}} Handle={()=> handleSectionClick('Archive')} Icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" viewBox="0 0 24 24" fill="none" stroke="#e0e1dd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-archive"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>}/>
        <SButton style={{width:'80%'}} Handle={()=> handleSectionClick('Favorite')} Icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" viewBox="0 0 24 24" fill="none" stroke="#e0e1dd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star-half"><path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2"/></svg>}/>
      </div>
    </div>
  )
}

export default Sidebar
