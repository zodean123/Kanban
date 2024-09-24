import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import './Board.css'
import Button from '../ButtonComponent/Button'
import Card from '../CardComponent/Card'


const Board = () => {

    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [group, setGroup] = useState("status");
    const [order, setOrder] = useState("priority");

    useEffect(() => {
        const fetch = async () => {
            try {
                
                const res = await axios.get(
                    "https://api.quicksell.co/v1/internal/frontend-assignment"
                );
                setTickets(res.data.tickets);
                setUsers(res.data.users);
            }
            catch (error) {
                console.log("Error fetching tickets", error);
            }
        };
        fetch();
    }, []);

    const getUserById = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.name : "Unknown User";
    }

    const groupingTickets = () => {
        const grouped = {};
        tickets.forEach((ticket) => {
            const key = ticket[group];
            if (!grouped[key]) {
                grouped[key] = {tickets : [], count: 0};
            }
          grouped[key].tickets.push(ticket);
          grouped[key].count++;
        });

        for (let key in grouped) {
            grouped[key].tickets.sort((a, b) => {
                if (order === "priority") {
                    return b.priority - a.priority;
                }
                else if (order === "title") {
                    return a.title.localeCompare(b.title);
                }
                return 0;
            });
        }
        return grouped;
    };

    const groupedTickets = groupingTickets();

    return (
      <div className="container">

        <Button
          group={group}
          setGroup={setGroup}
          order={order}
          setOrder={setOrder}
        />
        <div
          className="kanban-container"
        >
          {Object.keys(groupedTickets).map((group) => (
            <div key={group} className="display-group">
              <div className='group-nav'>
                <div className="nav">
                  {/* <img src={NavIcon(group, group)} alt={group} />
                   */}
                  <img src="/assets/icons/in-progress.svg" alt="" />
                  <p>{group}</p>
                  <p>{groupedTickets[group].count}</p>
                </div>
                <div className="icon-container">
                  <img src="/assets/icons/add.svg" alt="add" />
                  <img src="/assets/icons/3 dot menu.svg" alt="add1" />
                </div>
              </div>
              {groupedTickets[group].tickets.map((ticket) => (
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
}

export default Board