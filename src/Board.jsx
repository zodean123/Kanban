import { useState, useEffect } from 'react';
import axios from 'axios';
import './Board.css';
import Button from './Button';
import Card from './Card';

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [group, setGroup] = useState("status");
    const [order, setOrder] = useState("priority");
    const [groupedTickets, setGroupedTickets] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    "https://api.quicksell.co/v1/internal/frontend-assignment"
                );
                setTickets(res.data.tickets);
                setUsers(res.data.users);
            } catch (error) {
                console.log("Error fetching tickets", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const groupTickets = () => {
            const grouped = {};
            tickets.forEach((ticket) => {
                const key = ticket[group];
                if (!grouped[key]) {
                    grouped[key] = { tickets: [], count: 0 };
                }
                grouped[key].tickets.push(ticket);
                grouped[key].count++;
            });

            for (let key in grouped) {
                grouped[key].tickets.sort((a, b) => {
                    if (order === "priority") {
                        return b.priority - a.priority;
                    } else if (order === "title") {
                        return a.title.localeCompare(b.title);
                    }
                    return 0;
                });
            }
            setGroupedTickets(grouped);
        };

        groupTickets();
    }, [tickets, group, order]);

    const getUserById = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.name : "Unknown User";
    };

    return (
      <div className="container">
        <Button
          group={group}
          setGroup={setGroup}
          order={order}
          setOrder={setOrder}
        />
        <div className="kanban-container">
          {Object.keys(groupedTickets).map((groupKey) => (
            <div key={groupKey} className="display-group">
              <div className='group-nav'>
                <div className="nav">
                  <img src="/assets/icons/in-progress.svg" alt="" />
                  <p>{groupKey}</p>
                  <p>{groupedTickets[groupKey].count}</p>
                </div>
                <div className="icon-container">
                  <img src="/assets/icons/add.svg" alt="add" />
                  <img src="/assets/icons/3 dot menu.svg" alt="menu" />
                </div>
              </div>
              {groupedTickets[groupKey].tickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  ticket={ticket}
                  getUserById={getUserById}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
};

export default KanbanBoard;
