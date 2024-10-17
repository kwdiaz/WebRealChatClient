export default interface ChatProps {
    token: string;
    selectedUser: string;
    currentUser: string;
    connection: signalR.HubConnection | null;
    onBack: () => void; // Function to go back to the chat list
  }