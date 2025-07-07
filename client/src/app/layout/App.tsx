import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, SetActivities] = useState<Activity[]>([]);
  const [selectedActivity, SetSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(()=>{
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => SetActivities(response.data))

      return () => {}
  }, [])

  const handleSelectedActivity = (id: string) => {
    SetSelectedActivity(activities.find(x => x.id === id));
  }

  const cancelSelectActivity = () => {
    SetSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) {
      handleSelectedActivity(id);
    }
    else {
      cancelSelectActivity();
    }
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      SetActivities(activities.map(x => x.id === activity.id ? activity : x))
    }
    else {
      const newActivity = {...activity, id:activities.length.toString()};
      SetSelectedActivity(newActivity);
      SetActivities([...activities, newActivity])
    }
    setEditMode(false);
  }

  const handleDelete = (id: string) => {
    SetActivities(activities.filter(x => x.id !== id))
  }

  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
      <CssBaseline/>
      <NavBar openForm = {handleOpenForm} />

      <Container maxWidth='xl' sx={{mt: 3}}>
        <ActivityDashboard 
          activities={activities}
          selectActivity = {handleSelectedActivity}
          cancelSelectActivity = {cancelSelectActivity}
          selectedActivity = {selectedActivity}
          editMode = {editMode}
          openForm = {handleOpenForm}
          closeForm = {handleFormClose}
          submitForm = {handleSubmitForm}
          deleteActivity = {handleDelete}
          >
        </ActivityDashboard>
      </Container>
    </Box>
  )
}

export default App
