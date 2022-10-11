import FaceIcon from "@mui/icons-material/Face";
import InputIcon from "@mui/icons-material/Input";
import {
  Autocomplete,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AppState } from "../../../models/Nouns";
import { setUserData } from "../../../utils/LocalStore";
import { actions } from "../features/login";

const countries = [
  "Afghanistan",
  "Åland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia, Plurinational State of",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo, the Democratic Republic of the",
  "Cook Islands",
  "Costa Rica",
  "Côte d'Ivoire",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See (Vatican City State)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran, Islamic Republic of",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, Democratic People's Republic of",
  "Korea, Republic of",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Macedonia, the Former Yugoslav Republic of",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia, Federated States of",
  "Moldova, Republic of",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Réunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan, Province of China",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States Minor Outlying Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela, Bolivarian Republic of",
  "Viet Nam",
  "Virgin Islands, British",
  "Virgin Islands, U.S.",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

function LoginActivity({ history }: RouteComponentProps) {
  const user = useSelector((state: AppState) => state.login.user);
  const dispatch = useDispatch();

  return (
    <Paper
      elevation={0}
      style={{ margin: "20px", boxSizing: "border-box", display: "blocks" }}
    >
      <FaceIcon style={{ width: "20%", height: "20%", padding: "30px" }} />
      <Typography variant="h4" style={{ paddingBottom: "16px" }}>
        Choose nickname
      </Typography>
      {/* <Typography variant="h6">
        {`${process.env.REACT_APP_API_SERVER}`}
      </Typography> */}
      <TextField
        label="Nickname"
        value={user.nickname}
        onChange={(e) =>
          dispatch(
            actions.setUserData({ user: { ...user, nickname: e.target.value } })
          )
        }
        fullWidth
        style={{ margin: "10px 0" }}
      />
      <Autocomplete
        disablePortal
        options={countries}
        fullWidth
        renderInput={(params) => <TextField {...params} label="Country" />}
        style={{ margin: "10px 0" }}
        value={user.country}
        onChange={(e, value) =>
          dispatch(
            actions.setUserData({ user: { ...user, country: value ?? "" } })
          )
        }
      />
      <Button
        color="primary"
        startIcon={<InputIcon style={{ color: "#FFFFFF" }} />}
        variant="contained"
        style={{ margin: "10px 0" }}
        fullWidth
        onClick={(e) => {
          var endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
          const url = new URL(endpoint);
          const parms = new URLSearchParams({
            client_id:
              "412881470633-7tth8g8to2483pifqmtmjaqcnhvjor4l.apps.googleusercontent.com",
            scope: "profile",
            response_type: "code",
          });
          window.open(`${url}?${parms.toString()}`, "oauth:google", "");

          setUserData(user);
          history.push("/Menu");
        }}
      >
        Go!!!
      </Button>
    </Paper>
  );
}

export default withRouter(LoginActivity);
