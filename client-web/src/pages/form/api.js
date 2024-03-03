export async function fetchFormConfiguration() {
  try {
    const url = `${process.env.REACT_APP_API_SERVICE}form/get-config`;
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch all blogs");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function submitEnquiryForm(formData) {
  try {
    const url = `${process.env.REACT_APP_API_SERVICE}form/submit`;
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (rawResponse.status === 200) {
      const data = await rawResponse.json();
      alert("Form submitted successfully");
      return data;
    } else {
      throw new Error("Failed to fetch all blogs");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
