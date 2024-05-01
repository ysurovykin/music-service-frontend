import React, { useEffect, useMemo, useRef, useState } from "react";
import { Avatar, Button, Col, Dropdown, Form, Input, MenuProps, Modal, Row, Select, Tooltip, Typography } from "antd";
import { Delete, Info, InfoOutlined, MoreHoriz, Photo } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { userSelectors } from "../../../user/store/user.selectors";
import { renderTextWithToolTip } from "../../../helpers/react/form.helper";
import { artistProfileTypePalete, countries, months } from "../../../config";
import moment from "moment";
import { artistProfileSelectors } from "../../store/artist-profile.selectors";
import { artistProfileActions } from "../../store/artist-profile.actions";
import { EditProfileRequestData } from "../../store/artist-profile.model";

const { Title, Text } = Typography;

export const EditProfileModal = () => {
  const [form] = Form.useForm();

  const [isHovered, setIsHovered] = useState<boolean>();
  const [profileImageSrc, setProfileImageSrc] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File>();
  const [name, setName] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [birthDateDay, setBirthDateDay] = useState<number>();
  const [birthDateMonth, setBirthDateMonth] = useState<number>();
  const [birthDateYear, setBirthDateYear] = useState<number>();

  const inputRef = useRef<HTMLInputElement>(null);

  const profileImageUrl = useSelector(artistProfileSelectors.profileImageUrl);
  const isLoading = useSelector(artistProfileSelectors.isEditProfileLoading);
  const isOpen = useSelector(artistProfileSelectors.isEditProfileModalOpen);
  const artistCountry = useSelector(userSelectors.country);
  const artistBirthDate = useSelector(userSelectors.birthDate);
  const artistGender = useSelector(userSelectors.gender);
  const artistName = useSelector(artistProfileSelectors.name);
  const dispatch = useDispatch();
  const closeEditProfileModal = () => dispatch(artistProfileActions.closeEditProfileModal());
  const editProfile = (request: EditProfileRequestData) => dispatch(artistProfileActions.editProfile(request));

  const startProfileImageSelecting = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const editProfileImage = (value: HTMLInputElement) => {
    if (value.files) {
      const fileUploaded = value.files[0];
      setProfileImage(fileUploaded);
      const objectURL = URL.createObjectURL(fileUploaded);
      setProfileImageSrc(objectURL);
    }
  };

  const deleteProfileImage = () => {
    setProfileImageSrc('');
    setProfileImage(undefined);
  }

  const editProfileDisabled = useMemo(() => {
    const validationError = !name || !country || !gender || !birthDateDay || !birthDateMonth || !birthDateYear;
    const noChanges = (!profileImageSrc && !profileImageUrl || profileImageSrc === profileImageUrl) && name === artistName &&
      country === artistCountry && gender === artistGender && birthDateDay === artistBirthDate?.day &&
      birthDateMonth === artistBirthDate?.month && birthDateYear === artistBirthDate?.year;
    return validationError || noChanges;
  }, [name, country, gender, birthDateDay, birthDateMonth, birthDateYear, profileImageSrc, profileImageUrl]);

  const editProfileDisabledText = useMemo(() => {
    if (!name) {
      return 'Profile name is required';
    } else if (!country) {
      return 'Country is required';
    } else if (!gender) {
      return 'Gender is required';
    } else if (!birthDateDay) {
      return 'Birth day is required';
    } else if (!birthDateMonth) {
      return 'Birth month is required';
    } else if (!birthDateYear) {
      return 'Birth year is required';
    } else if (birthDateDay) {
      const amountOfDaysInMonth = new Date(birthDateYear, birthDateMonth, 0).getDate();
      if (isNaN(+birthDateDay)) {
        return 'Day of birth must be number';
      }
      if (birthDateDay > +amountOfDaysInMonth) {
        return `Day of birth must be between 1 and ${amountOfDaysInMonth}`;
      }
    } else if (birthDateYear) {
      if (isNaN(+birthDateYear)) {
        return 'Birth year must be number';
      }
      if (birthDateYear < 1900) {
        return 'Please enter a birth year from 1900 onwards';
      }
      const birthDate = new Date(birthDateYear, birthDateMonth, birthDateDay);
      if ((moment().diff(birthDate, 'years', true)) < 14) {
        return 'Registration for users under 14 years of age is prohibited';
      }
    } else {
      return '';
    }
  }, [name, country, gender, birthDateDay, birthDateMonth, birthDateYear]);

  useEffect(() => {
    if (artistName && isOpen) {
      setName(artistName);
    }
  }, [artistName, isOpen]);

  useEffect(() => {
    if (artistBirthDate && isOpen) {
      setBirthDateDay(artistBirthDate.day!);
      setBirthDateMonth(artistBirthDate.month!);
      setBirthDateYear(artistBirthDate.year!);
    }
  }, [artistBirthDate, isOpen]);

  useEffect(() => {
    if (artistCountry && isOpen) {
      setCountry(artistCountry);
    }
  }, [artistCountry, isOpen]);

  useEffect(() => {
    if (artistGender && isOpen) {
      setGender(artistGender);
    }
  }, [artistGender, isOpen]);

  useEffect(() => {
    if (profileImageUrl && isOpen) {
      setProfileImageSrc(profileImageUrl);
    }
  }, [profileImageUrl, isOpen]);

  const items: MenuProps['items'] = [
    {
      label: <div
        className='dropdown-item'
        onClick={() => startProfileImageSelecting()}>
        <Photo /><p>Change profile image</p>
        <input
          className="edit-profile-modal__file-input"
          type="file"
          ref={inputRef}
          onChange={(event) => editProfileImage(event.target)} />
      </div>,
      key: '0',
    },
    {
      label: <div
        className='dropdown-item'
        onClick={() => deleteProfileImage()}>
        <Delete /><p>Delete profile image</p>
      </div>,
      key: '1',
    }
  ]

  const clearInfo = () => {
    setProfileImageSrc('');
    setProfileImage(undefined);
    setName('');
  };

  const onFinish = () => {
    editProfile({
      name,
      profileImage
    });
  };

  const onClose = () => {
    closeEditProfileModal();
    clearInfo();
  }

  return (
    <Modal
      title='Edit profile details'
      open={isOpen}
      confirmLoading={isLoading}
      closable={false}
      onCancel={() => onClose()}
      width={700}
      footer={[
        <Button
          className="edit-profile-modal__cancel-button"
          key="cancel"
          onClick={() => onClose()}>
          Cancel
        </Button>,
        <Tooltip key="tooltip" title={editProfileDisabledText}>
          <Button
            className="edit-profile-modal__ok-button"
            key="submit"
            type="primary"
            disabled={editProfileDisabled}
            onClick={() => onFinish()}>
            Edit
          </Button>
        </Tooltip>
      ]}>
      <div className="edit-profile-modal__wrapper">
        <div
          className="edit-profile-modal__cover"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          {isHovered &&
            <div className="edit-profile-modal__edit-cover-button-wrapper">
              <Dropdown
                className="edit-profile-modal__edit-cover-button"
                menu={{ items }}
                trigger={['click']}>
                <MoreHoriz sx={{ color: 'white' }} />
              </Dropdown>
            </div>
          }
          <Avatar
            className="edit-profile-modal__cover-image"
            style={{ backgroundColor: `${profileImageSrc ? '' : artistProfileTypePalete.base}` }}
            size={174}
            src={profileImageSrc}
            shape="circle">
            <Title className="m-0">{name?.trim()?.split('')[0]?.toUpperCase()}</Title>
          </Avatar>
        </div>
        <Form
          form={form}
          initialValues={{
            name: artistName,
            gender: artistGender,
            country: artistCountry,
            day: artistBirthDate?.day,
            month: months[(artistBirthDate?.month!).toString()],
            year: artistBirthDate?.year
          }}>
          <Row gutter={8}>
            <Col span={24}>
              <Form.Item
                label={renderTextWithToolTip("Name", "This name will appear on your profile")}
                name="name">
                <Input
                  value={name}
                  onChange={event => setName(event.target.value)}
                  placeholder="Jack Sparrow"
                  maxLength={30} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={12}>
              <Form.Item
                label='Gender'
                name="gender">
                <Select
                  value={gender}
                  disabled={true}
                  onChange={value => setGender(value)}>
                  <Select.Option value='male'>Male</Select.Option>
                  <Select.Option value='female'>Female</Select.Option>
                  <Select.Option value='unknown'>Prefer not to say</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item
                label='Country'
                name="country">
                <Select
                  showSearch
                  disabled={true}
                  value={countries[country] || country}
                  onChange={value => setCountry(value)}
                  options={Object.keys(countries)?.map(countryId => ({ value: countryId, label: countries[countryId] }))}>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            style={{ marginBottom: '0px' }}
            label='Birth date'>
            <Row>
              <Row gutter={16}>
                <Col span={5}>
                  <Form.Item
                    name="day"
                    className="mb-0">
                    <Input
                      disabled={true}
                      value={birthDateDay}
                      onChange={event => setBirthDateDay(+event.target.value)}
                      maxLength={2}
                      min={1}
                      max={31}
                      placeholder="Day" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    className="mb-0"
                    name="month"
                    help=''>
                    <Select
                      disabled={true}
                      value={birthDateMonth}
                      onChange={value => setBirthDateMonth(+value)}
                      placeholder="Month"
                      options={Object.keys(months)?.map(month => ({ value: month, label: months[month] }))}>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item
                    className="mb-0"
                    name="year">
                    <Input
                      disabled={true}
                      value={birthDateYear}
                      onChange={event => setBirthDateYear(+event.target.value)}
                      maxLength={4}
                      min={1920}
                      max={2024}
                      placeholder="Year" />
                  </Form.Item>
                </Col>
              </Row>
            </Row>
          </Form.Item>
          <div className="edit-profile-modal__info-section">
            <Text className='edit-profile-modal__info-section-text'>
              <InfoOutlined sx={{ color: 'grey', fontSize: '14px' }} /> If you want to alter some of currently unchangeable information, please contact us
            </Text>
          </div>
        </Form>
      </div>
    </Modal >
  );
};