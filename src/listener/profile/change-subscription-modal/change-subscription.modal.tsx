import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Divider, Input, Modal, Select, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listenerSelectors } from "../../store/listener.selectors";
import { listenerActions } from "../../store/listener.actions";
import { formatCreditCardCVV, formatCreditCardExpirationDate, formatCreditCardNumber, renderTitleWithToolTip } from "../../../helpers/react/form.helper";
import { ChangeSubscriptionRequestData } from "../../store/listener.model";
import { SelectProps } from "antd/lib";

const { Text, Title } = Typography;

export function ChangeSubscriptionModal() {
  const [selectedCreditCard, setSelectedCreditCard] = useState<string>('new');
  const [selectedSubscriptionPlan, setSelectedSubscriptionPlan] = useState<string>('');
  const [isBankCardStage, setIsBankCardStage] = useState<boolean>(false);
  const [cardHolderName, setCardHolderName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardDate, setCardDate] = useState<string>('');
  const [cardCVV, setCardCVV] = useState<string>('');
  const [deletedCardIds, setDeletedCardIds] = useState<Array<string>>([]);
  const [isBigDevice, setIsBigDevice] = useState<boolean>(window.innerWidth > 950);

  const isChangeSubscriptionModalOpen = useSelector(listenerSelectors.isChangeSubscriptionModalOpen);
  const isSubscriptionChangingLoading = useSelector(listenerSelectors.isSubscriptionChangingLoading);
  const subscription = useSelector(listenerSelectors.subscription);
  const userCreditCards = useSelector(listenerSelectors.userCreditCards);

  const dispatch = useDispatch();
  const closeChangeSubscriptionModal = () => dispatch(listenerActions.closeChangeSubscriptionModal());
  const getUserCreditCards = () => dispatch(listenerActions.getUserCreditCards());
  const changeSubscription = (request: ChangeSubscriptionRequestData) => dispatch(listenerActions.changeSubscription(request));
  const deleteUserCreditCard = (cardId: string) => dispatch(listenerActions.deleteUserCreditCard(cardId));

  const deleteCreditCardFunction = (event: React.MouseEvent<HTMLElement, MouseEvent>, cardId: string) => {
    event.stopPropagation();
    setDeletedCardIds(state => [...state, cardId]);
    if (selectedCreditCard === cardId) {
      setSelectedCreditCard('new');
    }
    deleteUserCreditCard(cardId);
  };

  const modalWidth = useMemo(() => {
    return isBankCardStage || (subscription !== 'free') ? 400 : isBigDevice ? 800 : 500
  }, [isBankCardStage, subscription, isBigDevice])

  const userCreditCardsFormated = useMemo(() => {
    if (userCreditCards?.length) {
      return userCreditCards.filter(cardDetails => !deletedCardIds.includes(cardDetails.cardId)).map(cardDetails => ({
        value: cardDetails.cardId,
        label: `XXXX XXXX XXXX ${cardDetails.lastDigits}`
      }));
    } else {
      return [];
    }
  }, [userCreditCards, deletedCardIds]);

  const closeModal = () => {
    closeChangeSubscriptionModal();
  }

  const changeSubscriptionFunction = () => {
    if (subscription === 'free') {
      if (selectedCreditCard === 'new') {
        changeSubscription({
          subscription: selectedSubscriptionPlan,
          cardDetails: {
            holderName: cardHolderName,
            number: cardNumber,
            date: cardDate,
            cvv: cardCVV,
          }
        })
      } else {
        changeSubscription({
          subscription: selectedSubscriptionPlan,
          cardId: selectedCreditCard
        })
      }
    } else {
      changeSubscription({
        subscription: 'free'
      })

    }
  }

  const updateIsBigDeviceState = () => {
    if (window.innerWidth > 950) {
      setIsBigDevice(true);
    } else {
      setIsBigDevice(false);
    }
  }

  useEffect(() => {
    getUserCreditCards()
  }, []);

  useEffect(() => {
    if (subscription) {
      setSelectedSubscriptionPlan(subscription === 'free' ? 'premium' : 'free');
      setIsBankCardStage(false);
    }
  }, [subscription]);

  useEffect(() => {
    window.addEventListener('resize', updateIsBigDeviceState);
    return () => {
      window.removeEventListener('resize', updateIsBigDeviceState);
    }
  }, []);

  const renderFreeSubscriptionInfo = () => {
    return (
      <div
        className='change-subscription-modal__subscription-info--selected'
        onClick={() => setSelectedSubscriptionPlan('free')}>
        {renderTitleWithToolTip('Back to free subscription', 'NOTE: You will be transferred to a free subscription at the end of the current subscription term, but you will always be able to renew your subscription', 3, true)}
        <Divider style={{ margin: '10px' }} />
        <div className='change-subscription-modal__subscription-info-section custom-scroll-y'>
          <Title className="m-0" level={4}>Listener profile</Title>
          <ul className="change-subscription-modal__ul">
            <li className="change-subscription-modal__li"><Title className="m-0" level={5}>Your top monthly content limitation</Title></li>
            <ul className="change-subscription-modal__ul">
              <li className="change-subscription-modal__li"><Text>Most listened songs: <span className="change-subscription-modal__current-value">50</span> <Title className="m-0 change-subscription-modal__new-value--free" level={5}>20</Title></Text></li>
              <li className="change-subscription-modal__li"><Text>Most listened artists: <span className="change-subscription-modal__current-value">10</span> <Title className="m-0 change-subscription-modal__new-value--free" level={5}>5</Title></Text></li>
              <li className="change-subscription-modal__li"><Text>Most listened albums: <span className="change-subscription-modal__current-value">10</span> <Title className="m-0 change-subscription-modal__new-value--free" level={5}>5</Title></Text></li>
            </ul>
            <li className="change-subscription-modal__li"><Title className="m-0" level={5}>Song radio limitation</Title></li>
            <ul className="change-subscription-modal__ul">
              <li className="change-subscription-modal__li"><Text>Radio song generation limit: <span className="change-subscription-modal__current-value">Unlimited</span> <Title className="m-0 change-subscription-modal__new-value--free" level={5}>1 per day</Title></Text></li>
              <li className="change-subscription-modal__li"><Text>Radio song count: <span className="change-subscription-modal__current-value">50</span> <Title className="m-0 change-subscription-modal__new-value--free" level={5}>20</Title></Text></li>
            </ul>
            <li className="change-subscription-modal__li"><Title className="m-0" level={5}>Recomendations</Title></li>
            <ul className="change-subscription-modal__ul">
              <li className="change-subscription-modal__li"><Text>Different recomendation sections count: <span className="change-subscription-modal__current-value">4</span> <Title className="m-0 change-subscription-modal__new-value--free" level={5}>2</Title></Text></li>
              <li className="change-subscription-modal__li"><Text>Section`s recomendations count: <span className="change-subscription-modal__current-value">10</span> <Title className="m-0 change-subscription-modal__new-value--free" level={5}>5</Title></Text></li>
            </ul>
            <li className="change-subscription-modal__li"><Title className="m-0" level={5}>Playlists</Title></li>
            <ul className="change-subscription-modal__ul">
              <li className="change-subscription-modal__li"><Text>Different playlists limit: <span className="change-subscription-modal__current-value">10</span> <Title className="m-0 change-subscription-modal__new-value--free" level={5}>5</Title></Text></li>
            </ul>
          </ul>
        </div>
      </div>
    )
  };

  const renderPremiumSubscriptionInfo = () => {
    return (
      <div
        className={selectedSubscriptionPlan === 'premium' ? 'change-subscription-modal__subscription-info--selected' : 'change-subscription-modal__subscription-info'}
        onClick={() => setSelectedSubscriptionPlan('premium')}>
        <Title className="m-0" level={3}>Premium subscription</Title>
        <Title className="m-0" level={4}>4.99 USD/month</Title>
        <Divider style={{ margin: '10px' }} />
        <div className='change-subscription-modal__subscription-info-section custom-scroll-y'>
          <Title className="m-0" level={4}>Listener profile</Title>
          <ul className="change-subscription-modal__ul">
            <li className="change-subscription-modal__li"><Title className="m-0" level={5}>Your top monthly content limitation</Title></li>
            <ul className="change-subscription-modal__ul">
              <li className="change-subscription-modal__li"><Text>Most listened songs: <span className="change-subscription-modal__current-value">20</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>50</Title></Text></li>
              <li className="change-subscription-modal__li"><Text>Most listened artists: <span className="change-subscription-modal__current-value">5</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>10</Title></Text></li>
              <li className="change-subscription-modal__li"><Text>Most listened albums: <span className="change-subscription-modal__current-value">5</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>10</Title></Text></li>
            </ul>
            <li className="change-subscription-modal__li"><Title className="m-0" level={5}>Song radio limitation</Title></li>
            <ul className="change-subscription-modal__ul">
              <li className="change-subscription-modal__li"><Text>Radio song generation limit: <span className="change-subscription-modal__current-value">1 per day</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>Unlimited</Title></Text></li>
              <li className="change-subscription-modal__li"><Text>Radio song count: <span className="change-subscription-modal__current-value">20</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>50</Title></Text></li>
            </ul>
            <li className="change-subscription-modal__li"><Title className="m-0" level={5}>Recomendations</Title></li>
            <ul className="change-subscription-modal__ul">
              <li className="change-subscription-modal__li"><Text>Different recomendation sections count: <span className="change-subscription-modal__current-value">2</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>4</Title></Text></li>
              <li className="change-subscription-modal__li"><Text>Section`s recomendations count: <span className="change-subscription-modal__current-value">5</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>10</Title></Text></li>
            </ul>
            <li className="change-subscription-modal__li"><Title className="m-0" level={5}>Playlists</Title></li>
            <ul className="change-subscription-modal__ul">
              <li className="change-subscription-modal__li"><Text>Different playlists limit: <span className="change-subscription-modal__current-value">5</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>10</Title></Text></li>
            </ul>
          </ul>
        </div>
      </div>
    )
  };

  const renderUltimateSubscriptionInfo = () => {
    return (
      <div
        className={selectedSubscriptionPlan === 'ultimate' ? 'change-subscription-modal__subscription-info--selected' : 'change-subscription-modal__subscription-info'}
        onClick={() => setSelectedSubscriptionPlan('ultimate')}>
        {renderTitleWithToolTip('Ultimate subscription', 'This subscription will be applied to both the listener\'s profile and the artist\'s profile at the same time. If the Premium subscription is currently applied to one of the profiles, it will be canceled and a new one will be connected', 3, true)}
        <Title className="m-0" level={4}>7.49 USD/month</Title>
        <Divider style={{ margin: '10px' }} />
        <div className='change-subscription-modal__subscription-info-section custom-scroll-y'>
          <Title className="m-0" level={4}>Listener profile</Title>
          <ul className="change-subscription-modal__ul">
            <li className="change-subscription-modal__li"><Title className="m-0" level={5}>Your top monthly content limitation</Title></li>
            <ul className="change-subscription-modal__ul">
              <li className="change-subscription-modal__li"><Text>Most listened songs: <span className="change-subscription-modal__current-value">20</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>50</Title></Text></li>
              <li className="change-subscription-modal__li"><Text>Most listened artists: <span className="change-subscription-modal__current-value">5</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>10</Title></Text></li>
              <li className="change-subscription-modal__li"><Text>Most listened albums: <span className="change-subscription-modal__current-value">5</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>10</Title></Text></li>
            </ul>
            <li className="change-subscription-modal__li"><Title className="m-0" level={5}>Song radio limitation</Title></li>
            <ul className="change-subscription-modal__ul">
              <li className="change-subscription-modal__li"><Text>Radio song generation limit: <span className="change-subscription-modal__current-value">1 per day</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>Unlimited</Title></Text></li>
              <li className="change-subscription-modal__li"><Text>Radio song count: <span className="change-subscription-modal__current-value">20</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>50</Title></Text></li>
            </ul>
            <li className="change-subscription-modal__li"><Title className="m-0" level={5}>Recomendations</Title></li>
            <ul className="change-subscription-modal__ul">
              <li className="change-subscription-modal__li"><Text>Different recomendation sections count: <span className="change-subscription-modal__current-value">2</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>4</Title></Text></li>
              <li className="change-subscription-modal__li"><Text>Section`s recomendations count: <span className="change-subscription-modal__current-value">5</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>10</Title></Text></li>
            </ul>
            <li className="change-subscription-modal__li"><Title className="m-0" level={5}>Playlists</Title></li>
            <ul className="change-subscription-modal__ul">
              <li className="change-subscription-modal__li"><Text>Different playlists limit: <span className="change-subscription-modal__current-value">5</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>10</Title></Text></li>
            </ul>
          </ul>
          <Divider style={{ margin: '10px' }} />
          <Title className="m-0" level={4}>Artist profile</Title>
          <ul className="change-subscription-modal__ul">
            <li className="change-subscription-modal__li"><Title className="m-0" level={5}>Your top monthly content limitation</Title></li>
            <ul className="change-subscription-modal__ul">
              <li className="change-subscription-modal__li"><Text>Most listened songs: <span className="change-subscription-modal__current-value">20</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>50</Title></Text></li>
              <li className="change-subscription-modal__li"><Text>Most listened artists: <span className="change-subscription-modal__current-value">5</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>10</Title></Text></li>
              <li className="change-subscription-modal__li"><Text>Most listened albums: <span className="change-subscription-modal__current-value">5</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>10</Title></Text></li>
            </ul>
            <li className="change-subscription-modal__li"><Title className="m-0" level={5}>Song radio limitation</Title></li>
            <ul className="change-subscription-modal__ul">
              <li className="change-subscription-modal__li"><Text>Radio song generation limit: <span className="change-subscription-modal__current-value">1 per day</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>Unlimited</Title></Text></li>
              <li className="change-subscription-modal__li"><Text>Radio song count: <span className="change-subscription-modal__current-value">20</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>50</Title></Text></li>
            </ul>
            <li className="change-subscription-modal__li"><Title className="m-0" level={5}>Recomendations</Title></li>
            <ul className="change-subscription-modal__ul">
              <li className="change-subscription-modal__li"><Text>Different recomendation sections count: <span className="change-subscription-modal__current-value">2</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>4</Title></Text></li>
              <li className="change-subscription-modal__li"><Text>Section`s recomendations count: <span className="change-subscription-modal__current-value">5</span> <Title className="m-0 change-subscription-modal__new-value--paid" level={5}>10</Title></Text></li>
            </ul>
          </ul>
        </div>
      </div>
    )
  };

  const renderPaidSubscriptionInfo = () => {
    return (
      <div className={`change-subscription-modal__paid-subscriptions-section${isBigDevice ? '--big-device' : '--small-device'}`}>
        {renderPremiumSubscriptionInfo()}
        {isBigDevice ? <></> : <Divider style={{ background: 'white', margin: '10px 0px' }} />}
        {renderUltimateSubscriptionInfo()}
      </div>
    )
  };

  const renderSubscriptionInfoStage = () => {
    return subscription === 'free' ? renderPaidSubscriptionInfo() : renderFreeSubscriptionInfo();
  };

  const renderBankCardStage = () => {
    return (
      <>
        <Title className="m-0" level={3}>Choose card details or add new</Title>
        <Select
          defaultValue="new"
          style={{ width: '100%' }}
          value={selectedCreditCard}
          onChange={(value) => setSelectedCreditCard(value)}
          optionRender={(option) => (
            <div className="change-subscription-modal__credit-card-select">
              <Text>{option.label}</Text>
              {option.value !== 'new' ?
                <Text
                  className="change-subscription-modal__delete-credit-card"
                  onClick={(event) => deleteCreditCardFunction(event, `${option.value}`)}>Delete</Text> :
                <></>
              }
            </div>
          )}
          options={[
            ...userCreditCardsFormated,
            { value: 'new', label: <div>Add new card</div> },
          ]}
        />
        {selectedCreditCard === 'new' ?
          <div>
            <div className="change-subscription-modal__form-input-wrapper">
              <Title className="mb-0" level={5}>Card holder name</Title>
              <Input
                value={cardHolderName}
                disabled={isSubscriptionChangingLoading}
                onChange={(e) => setCardHolderName(e.target.value)}
                placeholder='Holder Name'
                maxLength={50} />
            </div>
            <div className="change-subscription-modal__form-input-wrapper">
              <Title className="mb-0" level={5}>Card number</Title>
              <Input
                value={cardNumber}
                disabled={isSubscriptionChangingLoading}
                onChange={(e) => setCardNumber(formatCreditCardNumber(e.target.value))}
                placeholder='XXXX XXXX XXXX XXXX'
                maxLength={19} />
            </div>
            <div className="change-subscription-modal__date-and-cvv-info">
              <div className="change-subscription-modal__form-input-wrapper">
                <Title className="mb-0" level={5}>Expiration date</Title>
                <Input
                  value={cardDate}
                  disabled={isSubscriptionChangingLoading}
                  onChange={(e) => setCardDate(formatCreditCardExpirationDate(e.target.value))}
                  placeholder='MM/YY'
                  maxLength={5}
                />
              </div>
              <div className="change-subscription-modal__form-input-wrapper">
                <Title className="mb-0" level={5}>CVV</Title>
                <Input
                  value={cardCVV}
                  disabled={isSubscriptionChangingLoading}
                  type="password"
                  onChange={(e) => setCardCVV(formatCreditCardCVV(e.target.value))}
                  placeholder='CVV'
                  maxLength={3} />
              </div>
            </div>
          </div> :
          null}
      </>
    );
  }

  return (
    <Modal
      title={subscription === 'free' ? 'Change subscription' : 'Cancel subscription'}
      open={isChangeSubscriptionModalOpen}
      confirmLoading={isSubscriptionChangingLoading}
      closable={false}
      onCancel={() => closeModal()}
      width={modalWidth}
      style={{ maxHeight: 500 }}
      footer={[
        <Button
          className="change-subscription-modal__cancel-button"
          key="cancel"
          onClick={() => isBankCardStage ? setIsBankCardStage(false) : closeModal()}>
          {isBankCardStage ? 'Back' : 'Cancel'}
        </Button>,
        <Button
          className="change-subscription-modal__ok-button"
          key="submit"
          type="primary"
          onClick={() => isBankCardStage ?
            changeSubscriptionFunction() :
            subscription === 'free' ?
              setIsBankCardStage(true) :
              changeSubscriptionFunction()
          }>
          {isBankCardStage ? 'Upgrade' : subscription === 'free' ? 'Next' : 'Upgrade'}
        </Button>
      ]}>
      <div>
        {isBankCardStage ?
          renderBankCardStage() :
          renderSubscriptionInfoStage()}
      </div>
    </Modal >
  );
}