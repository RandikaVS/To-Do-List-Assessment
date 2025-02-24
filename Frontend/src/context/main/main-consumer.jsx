import PropTypes from 'prop-types';

import { MainContext } from './main-context';

// ----------------------------------------------------------------------

export function MainConsumer({ children }) {
  return (
    <MainContext.Consumer>
      { children }
    </MainContext.Consumer>
  );
}

MainConsumer.propTypes = {
  children: PropTypes.node,
};
