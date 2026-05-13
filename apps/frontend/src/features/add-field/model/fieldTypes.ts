import React from 'react';
import {
  FileTextOutlined,
  FontSizeOutlined,
  NumberOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  PictureOutlined,
  CheckCircleOutlined,
  CodeOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import type { FieldType } from '@entities/content-model';

export const FIELD_TYPES: FieldType[] = [
  {
    title: 'Rich text',
    desc: 'Text formatting with references and media',
    icon: React.createElement(FileTextOutlined),
  },
  {
    title: 'Text',
    desc: 'Titles, names, paragraphs, list of names',
    icon: React.createElement(FontSizeOutlined),
    selected: true,
  },
  {
    title: 'Number',
    desc: 'ID, order number, rating, quantity',
    icon: React.createElement(NumberOutlined),
  },
  { title: 'Date and time', desc: 'Event dates', icon: React.createElement(CalendarOutlined) },
  {
    title: 'Location',
    desc: 'Coordinates: latitude and longitude',
    icon: React.createElement(EnvironmentOutlined),
  },
  {
    title: 'Media',
    desc: 'Images, videos, PDFs and other files',
    icon: React.createElement(PictureOutlined),
  },
  {
    title: 'Boolean',
    desc: 'Yes or no, 1 or 0, true or false',
    icon: React.createElement(CheckCircleOutlined),
  },
  {
    title: 'JSON object',
    desc: 'Data in JSON format',
    icon: React.createElement(CodeOutlined),
  },
  {
    title: 'Reference',
    desc: 'For example, a blog post can reference its author(s)',
    icon: React.createElement(LinkOutlined),
  },
];
