import Customer from "./Customer";

function Customers(props) {
  return (
    <div className="customers-container">
      {props.users.map((customer) => {
        return (
          <Customer
            customer={customer}
            showUserInfo={props.showUserInfo}
            handleMoreInfo={props.handleMoreInfo}
          />
        );
      })}
    </div>
  );
}

export default Customers;
