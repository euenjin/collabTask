import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const GroupInfo = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const TimeSelectionContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: 60px repeat(7, 1fr);
  gap: 1px;
  background-color: #eee;
  margin-top: 2rem;
`;

const TimeCell = styled.div`
  height: 30px;
  background-color: white;
  ${props => props.isSelected && `
    background-color: #4CAF50;
  `}
  &:hover {
    background-color: #e3f2fd;
    cursor: pointer;
  }
`;

const TimeLabel = styled.div`
  padding: 5px;
  text-align: right;
  background-color: #f5f5f5;
`;

const DayHeader = styled.div`
  padding: 10px;
  text-align: center;
  background-color: #f5f5f5;
  font-weight: bold;
`;

const TimeSelection = () => {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const[groupId, setGroupId] = useState(null);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => 
    `${String(i).padStart(2, '0')}:00`
  );

  const handleTimeSelect = (hour, day) => {
    const timeKey = `${hour}-${day}`;
    setSelectedTimes(prev => 
      prev.includes(timeKey)
        ? prev.filter(t => t !== timeKey)
        : [...prev, timeKey]
    );
  };
  const saveTimeSlots = async () => {
    try {
      setSaveStatus('Saving...');
      await axios.post('/api/timeslots', {
        selectedTimes,
        groupId
      });
      setSaveStatus('Saved successfully!');
    } catch (error) {
      console.error('Error saving time slots:', error);
      setSaveStatus('Error saving. Please try again.');
    }
  };

  useEffect(() => {
    // Get group ID from URL or context
    const urlParams = new URLSearchParams(window.location.search);
    const gid = urlParams.get('groupId');
    if (gid) {
      setGroupId(gid);
      // Fetch group name
      fetchGroupName(gid);
    }
  }, []);

  const fetchGroupName = async (gid) => {
    try {
      const response = await axios.get(`/api/groups/${gid}`);
      setGroupName(response.data.name);
    } catch (error) {
      console.error('Error fetching group:', error);
    }
  };

  return (
    <TimeSelectionContainer>
      <h2>Select Your Available Time Slots</h2>
      {groupName && (
        <GroupInfo>
          <h3>Group: {groupName}</h3>
        </GroupInfo>
      )}
      <TimeGrid>
        <TimeLabel></TimeLabel>
        {days.map(day => (
          <DayHeader key={day}>{day}</DayHeader>
        ))}
        
        {hours.map(hour => (
          <React.Fragment key={hour}>
            <TimeLabel>{hour}</TimeLabel>
            {days.map(day => (
              <TimeCell
                key={`${hour}-${day}`}
                isSelected={selectedTimes.includes(`${hour}-${day}`)}
                onClick={() => handleTimeSelect(hour, day)}
              />
            ))}
          </React.Fragment>
        ))}
      </TimeGrid>
      
      <SaveButton onClick={saveTimeSlots}>
        Save Time Slots
      </SaveButton>
      {saveStatus && <p>{saveStatus}</p>}
    </TimeSelectionContainer>
  );
};

export default TimeSelection;