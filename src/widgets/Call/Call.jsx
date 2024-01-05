/* eslint-disable react/prop-types */
import './Call.css';
import { useState } from 'react';
import axios from 'axios';
import { useCallContext } from '../../CallContext';

function Call({ Data }) {
  const { updateCallData, SetFav } = useCallContext();
  const [Click, setClick] = useState(false);
  const id = Data.id;
  const direction = Data.direction || 'unknown';
  const from = Data.from || 'unknown';
  const to = Data.to || 'unknown';
  const duration = Data.duration || 0;
  const call_type = Data.call_type || 'unknown';
  const is_archived = Data.is_archived || false;
  const formattedDate = new Date(Data.created_at).toLocaleString();

  function secondsToHMS(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;
    let p = `${hours}h: ${minutes}m: ${remainingSeconds}s`;
    return p;
  }

  let duration1 = secondsToHMS(duration);

  const handleArchive = async () => {
    updateCallData((prevCallData) =>
          prevCallData.map((call) =>
            call.id === Data.id ? { ...call, is_archived: true } : call
          )
        );
    setTimeout(async () => {
      try {
        await axios.patch(`https://cerulean-marlin-wig.cyclic.app/activities/${id}`, {
          is_archived: true,
        },
        {
          method: 'PATCH',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          body: JSON.stringify()
        }
        );
        
      } catch (error) {
        console.error('Error archiving the call:', error);
        console.log(Data.id);
      }
    }, 200); 
  };

  const handleUnArchive = async () => {
    updateCallData((prevCallData) =>
          prevCallData.map((call) =>
            call.id === Data.id ? { ...call, is_archived: false } : call
          )
        );
    setTimeout(async () => {
      try {
        await axios.patch(`https://cerulean-marlin-wig.cyclic.app/activities/${Data.id}`, {
          is_archived: false,
        });
        
      } catch (error) {
        console.error('Error unarchiving the call:', error);
      }
    }, 200); 
  };

  return (
    <div className={`Call ${is_archived ? 'archived' : ''}`} onClick={() => setClick((prev) => !prev)}>
      {Click === false ? (
        <div>
          {call_type === 'voicemail' ? (
            <Voicemail duration={duration1} from={from ? from : 'unknown'} to={to ? to : 'unknown'} formattedDate={formattedDate} is_archived={is_archived} />
          ) : (
            <NormalCall call_type={call_type} duration={duration1} from={from ? from : 'unknown'} to={to ? to : 'unknown'} formattedDate={formattedDate} is_archived={is_archived} direction={direction} />
          )}
        </div>
      ) : (
        <div className='Options'>
          {!is_archived ? (
            <button onClick={handleArchive}>Archive🗃️</button>
          ) : (
            <button onClick={handleUnArchive}>Unarchive📥</button>
          )}
          <button onClick={() => SetFav((Prev) => [...Prev, Data])}>Star⭐</button>
        </div>
      )}
    </div>
  );
}

export default Call;






function Voicemail({duration,from,to,formattedDate}){
  return(
    <div className='Voicemail'>
      <div className='Header'>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f6aa1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-voicemail"><circle cx="6" cy="12" r="4"/><circle cx="18" cy="12" r="4"/><line x1="6" x2="18" y1="16" y2="16"/></svg>
        <div className='ContactDetails'>
          <strong>{from}</strong>
          <div className='DownArrow'>→</div>
          <strong>{to}</strong>
        </div>
        <p style={{fontSize:'0.6em'}}>{duration}</p>
        <p className='Date'>{formattedDate}</p>
      </div>
    </div>
  )
}
function NormalCall({call_type,duration,from,to,formattedDate}){
  const missed=<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f94144" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-off"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><line x1="22" x2="2" y1="2" y2="22"/></svg>;
  const answered=<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00eb5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-call"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><path d="M14.05 2a9 9 0 0 1 8 7.94"/><path d="M14.05 6A5 5 0 0 1 18 10"/></svg>;
  const svg=call_type==='missed' ? missed : answered
  return(
    <div>
      <div className='Header'>
        {svg}
        <div className='ContactDetails'>
          <strong>{from}</strong>
          <div className='DownArrow'>→</div>
          <strong>{to}</strong>
        </div>
        <p style={{fontSize:'0.6em'}}>{duration}</p>
        <p className='Date'>{formattedDate}</p>
      </div>
    </div>
  )
}