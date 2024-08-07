import React, { useState } from 'react';
import { Modal, Box, Typography, Button, List, ListItem, TextField } from '@mui/material';

interface Ticket {
  id: number;
  name: string;
  price: number;
  available: number;
}

interface SelectedTicket {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface TicketModalProps {
  open: boolean;
  handleClose: () => void;
  tickets: Ticket[];
  onSelectTickets: (selectedTickets: SelectedTicket[]) => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ open, handleClose, tickets, onSelectTickets }) => {
  const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>([]);

  const handleQuantityChange = (ticket: Ticket, quantity: number) => {
    if (quantity > ticket.available) {
      quantity = ticket.available;
    }
    const existingTicketIndex = selectedTickets.findIndex(t => t.id === ticket.id);
    if (existingTicketIndex >= 0) {
      const updatedTickets = [...selectedTickets];
      if (quantity > 0) {
        updatedTickets[existingTicketIndex].quantity = quantity;
      } else {
        updatedTickets.splice(existingTicketIndex, 1);
      }
      setSelectedTickets(updatedTickets);
    } else if (quantity > 0) {
      setSelectedTickets([...selectedTickets, { ...ticket, quantity }]);
    }
  };

  const handleConfirmSelection = () => {
    onSelectTickets(selectedTickets);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 400, 
        bgcolor: 'background.paper', 
        boxShadow: 24, 
        p: 4 
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Ticket Options
        </Typography>
        <List>
          {tickets.map((ticket) => (
            <ListItem key={ticket.id}>
              <Typography>
                {ticket.name} - ${ticket.price} (Available: {ticket.available})
              </Typography>
              <TextField
                type="number"
                inputProps={{ min: 0, max: ticket.available }}
                onChange={(e) => handleQuantityChange(ticket, parseInt(e.target.value))}
                label="Quantity"
              />
            </ListItem>
          ))}
        </List>
        <Button onClick={handleConfirmSelection} variant="contained">Confirm Selection</Button>
        <Button onClick={handleClose} variant="contained">Close</Button>
      </Box>
    </Modal>
  );
};

export default TicketModal;
