import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect, useContext } from "react";
import PhoneInput from "react-phone-input-2";
import { Button, Form, Input, Dimmer, Loader } from "semantic-ui-react";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import { serviceCategories } from "../../../common/constants";
import ethereumApiFactory from "../../../ethereum/ethereumApi";
import { displayNotification } from "../../../lib/utilities";
import { contractAddress, abi } from "../../../ethereum/serviceManagerContract";
import WalletProvider from "../../../common/context/walletProvider";
import { useNavigate } from "react-router-dom";

const BecomeAProPage = () => {
    let navigate = useNavigate();

    const [companyName, setCompanyName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [serviceCost, setServiceCost] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const serviceCategoriesOptions = Object.entries(serviceCategories).map(
        ([key, value]) => ({
            value: parseInt(key),
            label: value
        })
    );
    const [category, setCategory] = useState({
        value: serviceCategoriesOptions[0].value,
        label: serviceCategoriesOptions[0].label
    });

    const ethereumApi = useRef({});
    const currentBlockNumber = useRef(null);

    const { wallet } = useContext(WalletProvider);

    useEffect(() => {
        if (!window || !window.ethereum) return;
        ethereumApi.current = ethereumApiFactory(window.ethereum);
    });

    useEffect(() => {
        async function getBlockNumber() {
            const provider = ethereumApi.current.provider;
            return await provider.getBlockNumber();
        }

        if (wallet.accounts.length > 0) {
            const contract = ethereumApi.current.getContractReader(
                contractAddress,
                abi
            );

            const filter = contract.filters.RegisteredServiceProvider(
                wallet.accounts[0]
            );

            getBlockNumber().then((blockNumber) => {
                currentBlockNumber.current = blockNumber;
            });

            contract.on(filter, emitRegistrationInfo);

            return () => contract.off(filter, emitRegistrationInfo);
        }
    });

    function emitRegistrationInfo(adress, e) {
        if (e.blockNumber > currentBlockNumber.current) {
            setSubmitting(false);
            navigate("/my-services");
        }
    }

    const onSubmit = async (event) => {
        try {
            setSubmitting(true);

            await ethereumApi.current.createNewServiceProvider(
                companyName,
                email,
                phone,
                ethereumApi.current.parseUnits(serviceCost, "wei"),
                category.value
            );
        } catch (error) {
            setSubmitting(false);
            displayNotification("error", null, error);
        }

        event.preventDefault();
    };

    return (
        <>
            <Dimmer active={submitting} inverted>
                <Loader indeterminate>Creating Agreement</Loader>
            </Dimmer>
            <div className="become-pro">
                <div>
                    <div className="become-pro-form">
                        <div className="become-pro-heading">
                            <FontAwesomeIcon
                                icon="user-circle"
                                size="2x"
                                color="blue"
                            />
                            <h3>Become a Pro</h3>
                        </div>
                        <Form onSubmit={onSubmit}>
                            <Form.Input
                                placeholder="Company Name"
                                icon="building outline"
                                iconPosition="left"
                                value={companyName}
                                onChange={(event) =>
                                    setCompanyName(event.target.value)
                                }
                            />
                            <PhoneInput
                                value={phone}
                                inputProps={{
                                    required: true,
                                    autoFocus: true
                                }}
                                onChange={(value) => setPhone(value)}
                            />
                            <Form.Input
                                placeholder="Email"
                                icon="at"
                                iconPosition="left"
                                value={email}
                                required
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                            <Form.Field>
                                <Select
                                    value={category}
                                    options={serviceCategoriesOptions}
                                    onChange={(value) => setCategory(value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    label={{ content: "Wei" }}
                                    labelPosition="right"
                                    placeholder="Service Cost in"
                                    value={serviceCost}
                                    required
                                    onChange={(event) =>
                                        setServiceCost(event.target.value)
                                    }
                                />
                            </Form.Field>
                            <Form.Field>
                                <Button
                                    primary
                                    type="submit"
                                    disabled={submitting}
                                >
                                    Become a Pro
                                </Button>
                            </Form.Field>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BecomeAProPage;
