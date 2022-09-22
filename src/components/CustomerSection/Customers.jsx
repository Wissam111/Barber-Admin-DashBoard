import Customer from "./Customer";

function Customers(props) {
  return (
    <div className="customers-container">
      {props.customers.map((customer) => {
        return <Customer customer={customer} />;
      })}
    </div>
  );
}

export default Customers;
