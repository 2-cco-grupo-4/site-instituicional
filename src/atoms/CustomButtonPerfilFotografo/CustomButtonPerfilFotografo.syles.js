import { makeStyles} from "@mui/styles";

export default makeStyles(() => ({
  section: {
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: "16px"
  },
  sectionOne: {
    maxWidth: "43.5%",
    backgroundColor: "Black",
    border: "1px solid black",
    color: "white",
    justifyContent: "center",
    borderRadius: "4px",
    padding: "4px"
  },
  sectionTwo: {
    maxWidth: "43.5%",
    justifyContent: "center",
    borderRadius: "4px",
    border: "1px solid black",
    padding: "4px"

  }
}));