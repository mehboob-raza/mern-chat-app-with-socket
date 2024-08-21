import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [pic, setPic] = useState(null);
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate()

  const validateForm = () => {
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords do not match.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    // Add more validation if needed
    return true;
  };

  const postDetails = async (image) => {
    setPicLoading(true);
    if (image.type === "image/jpeg" || image.type === "image/png" || image.type === "image/jpg") {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "chat-app"); // Replace with your upload preset
      data.append("cloud_name", "dx5bec4uq");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dx5bec4uq/image/upload`,
          data
        );
        const imageUrl = response.data.secure_url;
        setPic(imageUrl); // Set the image URL
        toast({
          title: "Image uploaded successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast({
          title: "Error uploading image.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setPicLoading(false);
      }
    } else {
      toast({
        title: "Invalid file type.",
        description: "Please upload a .jpg, .jpeg, or .png file.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setPicLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      postDetails(e.target.files[0]);
    }
  };

  const submitHandler = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post("/api/user", {
        name,
        email,
        password,
        pic,
      });
      toast({
        title: "Signup successful!",
        description: "Account created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      setPicLoading(false);
      navigate('/chat')
    }
    catch (error) {
      console.error("Error during signup:", error);
      toast({
        title: "Signup failed.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/jpeg, image/png, image/jpg"
          onChange={handleImageChange}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        isLoading={picLoading}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
