import React from "react";
import LoginForm from "./LoginForm";
import ComboBox from "../../components/ComboBox";
import comboBoxOptions, {
  nationCbOptions,
} from "../../components/comboBoxOptions"; // Import the comboBoxOptions and nationCbOptions

// Import the CSS file for styling

function FormGuide() {
  return (
    <div>
      <main className="container">
        <LoginForm />
        <ComboBox options={comboBoxOptions} label="Combo box1" />
        <ComboBox options={nationCbOptions} label="Nation" sx={{ mt: 2 }} />
        {/* Pass the options as a prop */}
      </main>
    </div>
  );
}

export default FormGuide;
