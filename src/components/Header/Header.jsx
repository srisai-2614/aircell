import './Header.css';
import axios from 'axios';
import { useCallContext } from '../../CallContext';
import { useState } from 'react';

function Header() {
  const { updateCallData } = useCallContext();
  const [archiveAll, setArchiveAll] = useState(true);

  const handleArchive = async () => {
    try {
      await axios.patch('https://cerulean-marlin-wig.cyclic.app/reset', {});
      updateCallData((prev) =>
        prev.map((item) => {
          return { ...item, is_archived: archiveAll };
        })
      )
      setArchiveAll((prev)=>!prev);
    } catch (error) {
      console.error('Error archiving/unarchiving all calls:', error);
    }
  };

  return (
    <div>
      <div className='FirstHeader'>
        <strong>Activity</strong>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 24 24" fill="none" stroke="#001d3d" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-smartphone">
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      </div>
      <div className='SelectAll'>
        <button style={{ width: '100%', background: '#0d1b2a', color: '#f9f9f9' }} onClick={handleArchive}>
          {archiveAll ? 'Archive All' : 'Unarchive All'}
        </button>
      </div>
    </div>
  );
}

export default Header;
